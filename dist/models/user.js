"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Please enter email"],
    },
    username: {
        type: String,
        required: [true, "Please enter username"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
    }
}, { timestamps: true });
userSchema.statics.createUser = function (email, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExists = yield this.findOne({ email: email });
        if (userExists) {
            // return new Error(`User with email ${email} already exists`);
            return false;
        }
        const usernameExists = yield this.findOne({ username: username });
        if (usernameExists) {
            // return new Error(`User with username ${username} already exists`);
            return false;
        }
        else {
            const salt = yield (0, bcrypt_1.genSalt)(10);
            const hashPassword = yield (0, bcrypt_1.hash)(password, salt);
            const user = yield this.create({ email, username, password: hashPassword });
            return user;
        }
    });
};
userSchema.statics.loginUser = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExists = yield this.findOne({ email: email });
        if (!userExists) {
            // return new Error(`User with email ${email} does not exist`);
            return false;
        }
        const matchedPassword = yield (0, bcrypt_1.compare)(password, userExists.password);
        if (!matchedPassword) {
            // return new Error(`Invalid Password`)
            return false;
        }
        return userExists;
    });
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
