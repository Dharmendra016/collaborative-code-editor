"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
const stocketio_1 = require("./socket/stocketio");
const dbConnect_1 = __importDefault(require("./utility/dbConnect"));
//connection
(0, dbConnect_1.default)();
stocketio_1.app.get("/", (req, res) => {
    res.send("Hi there");
=======
const express_1 = __importDefault(require("express"));
const dbConnect_1 = __importDefault(require("./utility/dbConnect"));
const login_1 = __importDefault(require("./routes/login"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./config/passport"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
//connection
(0, dbConnect_1.default)();
app.use((0, express_session_1.default)({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/auth", login_1.default);
app.use("/dashboard", dashboard_1.default);
app.get("/", (req, res) => {
    res.send("You are on homepage");
});
app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
>>>>>>> development
});
