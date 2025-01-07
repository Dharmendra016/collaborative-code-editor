import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserThroughGoogle } from "../models/userSchema";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Here, you can handle user storage/retrieval in DB.

      try {
        // Check if user exists in DB
        let user = await UserThroughGoogle.findOne({
          email: profile.emails?.[0].value,
        });
        if (!user) {
          // Create a new user if not found
          user = new UserThroughGoogle({
            username: profile.displayName,
            email: profile.emails ? profile.emails[0].value : "",
            googleId: profile.id,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;
