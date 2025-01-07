"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        // Access the user info from the session (stored by Passport)
        const user = req.user;
        console.log(user);
        res.json({
            user,
        });
    }
    else {
        res.redirect("/");
    }
});
exports.default = router;
