"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = (url) => {
    try {
        mongoose_1.default.connect(url);
    }
    catch (err) {
        console.error(err);
    }
};
exports.default = connectDB;
