import express from "express";
import passport from "../config/passport";

const router = express();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Redirect user after successful login
    res.redirect("/dashboard");
  }
);

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


export default router;
