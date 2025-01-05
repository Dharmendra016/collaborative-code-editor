"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get("/", auth_1.authentication, (req, res) => { res.send("Hello guys i am dharmendra"); });
router.post("/sendotp", userController_1.sendOtp);
router.post("/verifyotp", userController_1.verifyOtp);
router.post("/signup", userController_1.registerUser);
router.post("/login", userController_1.loginUser);
exports.default = router;
