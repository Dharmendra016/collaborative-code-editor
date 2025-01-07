"use strict";
<<<<<<< HEAD
=======
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
router.post("/sendOtp", userController_1.sendOtp);
router.post("/verifyOtp", userController_1.verifyOtp);
router.post("/signup", userController_1.registerUser);
exports.default = router;
>>>>>>> development
