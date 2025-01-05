import express from "express";
import { loginUser, registerUser, sendOtp, verifyOtp } from "../controller/userController";
import { authentication } from "../middlewares/auth";

const router = express.Router();

router.get("/",authentication,(req,res) => {res.send("Hello guys i am dharmendra")})
router.post("/sendotp", sendOtp);
router.post("/verifyotp",verifyOtp);
router.post("/signup",registerUser);
router.post("/login",loginUser)

export default router;