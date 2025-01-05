import { Request, Response } from "express";
import {app} from "./socket/stocketio"
import dbConnection from "./utility/dbConnect"
import userRoute from "./routes/userRoutes"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
//connection
dbConnection();

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",userRoute);

app.get("/", (req:Request, res:Response)=> {
    res.send("Hi there")
})

