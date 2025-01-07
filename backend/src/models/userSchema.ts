import mongoose from "mongoose";

const userSchemaforEmail = new mongoose.Schema({

    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:"UserImage",
    }
},{timestamps:true})

const userSchemaforGoogle = new mongoose.Schema({
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
})
const UserThroughEmail = mongoose.model('user' , userSchemaforEmail);
const UserThroughGoogle = mongoose.model("googleuser", userSchemaforGoogle)
export {UserThroughEmail, UserThroughGoogle};