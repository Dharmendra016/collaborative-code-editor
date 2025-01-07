"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../config/passport"));
const router = (0, express_1.default)();
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
// Google callback
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    // Redirect user after successful login
    res.redirect("/dashboard");
});
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed", error: err });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Failed to destroy session", error: err });
            }
            res.clearCookie("connect.sid", { path: "/" }); // Ensure cookie is cleared
            res.redirect("/"); // Redirect to homepage or login
        });
    });
});
exports.default = router;
