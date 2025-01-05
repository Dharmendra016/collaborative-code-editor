"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtVerified = exports.getJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || "";
const getJwtToken = (data) => {
    try {
        return jsonwebtoken_1.default.sign(data, secret, { expiresIn: 60 * 60 });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getJwtToken = getJwtToken;
const getJwtVerified = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getJwtVerified = getJwtVerified;
