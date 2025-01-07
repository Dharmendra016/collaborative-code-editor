import { Request, Response } from "express";
import {UserThroughEmail} from "../models/userSchema"
import otpGenerator from "otp-generator"
import { Otp } from "../models/otp";
import {createHmac} from "node:crypto"
import "dotenv/config"


export const sendOtp = async (req:Request , res:Response): Promise<void> =>{
    try {
        
        const {email} = req.body ; 

        if( !email ){
             res.status(400).json({
                success:false,
                message:"Please Enter you email"
            })
            return
        }

        var otp = otpGenerator.generate(6, {
            digits:true,
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        })
        
        var isOtpUnique = await Otp.findOne({otp}); 
        
        while( isOtpUnique ){
            otp = otpGenerator.generate(5, {
                digits:true,
                upperCaseAlphabets: false,
                specialChars: false ,
                lowerCaseAlphabets:false
            });
            isOtpUnique = await Otp.findOne({otp});
        }

        await Otp.create({
            email,
            otp, 
        })

        res.status(200).json({
            success:true,
            message:"Successively created otp",
        })


    } catch (error) {
        console.log(error);
    }
}

export const verifyOtp = async (req:Request ,res:Response): Promise<void> => {

    try {
        
        const {otp , email} = req.body ; 

        if( !otp || !email){
             res.status(400).json({
                success:false,
                message:"Please provide otp."
            })
            return
        }

        const updatedOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);

        if( updatedOtp[0].otp !== otp){
            res.status(400).json({
                success:false,
                message:"OTP not matched"
            })
            return 
        }

         res.status(200).json({
            success:true,
            message:"Correct OTP",
            user:{
                email,
            }
        })



    } catch (error) {
        console.log(error);
    }

}


export const  registerUser = async(req:Request ,res:Response): Promise<void> => {
    try {
        const {username, email , password, confirmPassword} = req.body; 

        if( !email || !username || !password || !confirmPassword){
            res.status(400).json({
                success:false,
                message:"All field are required."
            })
            return 
        }

        const user = await UserThroughEmail.findOne({email});
        if( user ){
             res.status(400).json({
                success:false,
                message:"User already registered."
            })
            return
        }

        if( password !== confirmPassword){
             res.status(400).json({
                success:false,
                message:"Passowrd doesn't match."
            })
            return
        }
        const secret:string = process.env.HASH_SECRET || ""
        const hashedPassword = createHmac('sha256', secret)
                                .update(password)
                                .digest('hex');

        const userCreated = await UserThroughEmail.create({username , email , password:hashedPassword , confirmPassword:hashedPassword});

        if( !userCreated){
             res.status(200).json({
                success:false,
                message:"user not created",
            })
            return
        }

         res.status(200).json({
            success:true,
            message:"successfully created user",
            user:userCreated
        })
        
        


    } catch (error) {
        console.log(error);
    }
}