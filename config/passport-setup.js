const passport = require("passport");
const WindowsLiveStrategy = require("passport-outlook").Strategy;
const keys = require("./keys");
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
      clientID: keys.outlook.clientID,
      clientSecret: keys.outlook.clientSecret,
      callbackURL: auth,
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      User.findOne({ outlookID: profile.emails[0].value }).then(
        (currentUser) => {
          if (currentUser) {
            // already have this user
            console.log("Existing User");
            done(null, currentUser);
          } else {
            // if not, create user in our db
            console.log(profile);
            new User({
              outlookID: profile.emails[0].value,
              username: profile.displayName,
            })
              .save()
              .then((newUser) => {
                console.log("created new User");
                done(null, newUser);
              });
          }
        }
      );
    }
  )
);
