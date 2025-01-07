import express from "express";
import loginRouter from "./routes/login";
import session from "express-session";
import passport from "./config/passport";
import dashboardRouter from "./routes/dashboard"
import dbConnection from "./utility/dbConnect"
import userRoute from "./routes/userRoutes"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 8000;

//connection
dbConnection();

app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/register",userRoute);
app.use("/auth", loginRouter);
app.use("/dashboard", dashboardRouter)

app.get("/", (req, res) => {
  res.send("Hello from landing page");
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});