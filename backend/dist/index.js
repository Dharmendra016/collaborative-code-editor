"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stocketio_1 = require("./socket/stocketio");
const dbConnect_1 = __importDefault(require("./utility/dbConnect"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//connection
(0, dbConnect_1.default)();
stocketio_1.app.use((0, cookie_parser_1.default)());
stocketio_1.app.use(body_parser_1.default.json());
stocketio_1.app.use(body_parser_1.default.urlencoded({ extended: true }));
stocketio_1.app.use("/", userRoutes_1.default);
stocketio_1.app.get("/", (req, res) => {
    res.send("Hi there");
});
