const passport = require("passport");
const WindowsLiveStrategy = require("passport-outlook").Strategy;
const { OUTLOOK_CLIENT_ID, OUTLOOK_CLIENT_SECRET } = process.env;
const User = require("../models/user");

let port = process.env.PORT;
let auth =
  "https://swccoursedirectory.herokuapp.com/coursedirectory/auth/outlook/redirect";
if (port == null || port == "") {
  auth = "http://localhost:3000/coursedirectory/auth/outlook/redirect";
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new WindowsLiveStrategy(
    {
      // options for outlook strategy
      clientID: OUTLOOK_CLIENT_ID,
      clientSecret: OUTLOOK_CLIENT_SECRET,
      callbackURL: auth,
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      User.findOne({ outlookID: profile.emails[0].value }).then(
        (currentUser) => {
          if (currentUser.isAdmin) {
            // already have this user

            console.log("Admin Logged");

            done(null, currentUser);
          } else {
            console.log("not authenticated");
            done(null);
          }
        }
      );
    }
  )
);
