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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.login = exports.register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = require("jsonwebtoken");
//method -> post
//url -> /register
const register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    const user = yield user_1.default.createUser(email, username, password);
    console.log(user);
    if (!user) {
        return res.status(400).json({ message: "Sign up failed" });
    }
    console.log(user._id);
    const accessToken = generateToken(user._id, process.env.ACCESS_TOKEN_SECRET, '1d');
    //const refreshToken = generateToken(user._id, process.env.REFRESH_TOKEN_SECRET as string, '1d');
    //res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 480 * 60 * 60 * 1000})
    console.log(user);
    res.status(200).json({ message: "Signup successful", email: user.email, username: user.username, token: accessToken });
}));
exports.register = register;
//method -> post
//url -> /login
const login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.loginUser(email, password);
    if (!user) {
        return res.status(400).json({ message: "Login failed" });
    }
    const accessToken = generateToken(user._id, process.env.ACCESS_TOKEN_SECRET, '1d');
    console.log(user);
    res.status(200).json({ message: "Login successful", email: user.email, username: user.username, token: accessToken });
}));
exports.login = login;
const refresh = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.refresh = refresh;
const generateToken = (id, secret, expiration) => {
    return (0, jsonwebtoken_1.sign)({ id }, secret, {
        expiresIn: expiration
    });
};
