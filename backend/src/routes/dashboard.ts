import express from "express";

const router = express();

router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        // Access the user info from the session (stored by Passport)
        const user = req.user as any;
        console.log(user);
        res.json({
          user,
        });
      }
      else {
        res.redirect("/");
      }
})

export default router;