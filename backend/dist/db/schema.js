"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserThroughGoogle = exports.UserThroughEmail = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchemaforEmail = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "UserImage",
    }
}, { timestamps: true });
const userSchemaforGoogle = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    }
});
const UserThroughEmail = mongoose_1.default.model('user', userSchemaforEmail);
exports.UserThroughEmail = UserThroughEmail;
const UserThroughGoogle = mongoose_1.default.model("googleuser", userSchemaforGoogle);
exports.UserThroughGoogle = UserThroughGoogle;
