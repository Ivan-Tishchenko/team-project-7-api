const express = require("express");

const passport = require("passport");
const GoogleStrategy =
  require("passport-google-oauth").OAuth2Strategy;

const { User } = require("../../models/user");

const setUser = require("../../user/setUser");
const loginUser = require("../../user/loginUser");
const logoutUser = require("../../user/logoutUser");

const hendleJwtControler = require("../../midlewares/hendleJwtControler");
const {
  createHashPassword,
} = require("../../helpers/hashPassword");
const { createJWT } = require("../../user/jwt");
const {
  compareHashPassword,
} = require("../../helpers/comparePassword");

const router = express.Router();

router.use(
  require("express-session")({
    secret: process.env.CLIENT_SICRET,
    resave: true,
    saveUninitialized: true,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SICRET,
      callbackURL:
        "http://localhost:3000/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  // Сохраняем только идентификатор пользователя в сессии
  done(null, user.id);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "email",
    ],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      "https://etopritika.github.io/team-project-7/", // Маршрут для перенаправления при неудачной аутентификации
  }),
  async function (req, res) {
    // Успешная аутентификация, можете выполнить дополнительные действия и перенаправить пользователя

    let jwt = null;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const user = await User.findOne({
      email: req.user._json.email,
    });

    if (user) {
      const isPasswordTrue = await compareHashPassword(
        `${req.user._json.sub}+${req.user._json.email}`,
        user.password
      );

      if (isPasswordTrue) {
        jwt = createJWT({
          _id: user._id,
          email: user.email,
        });
      } else {
        console.log("password false");
      }
    } else {
      const hashPassword = await createHashPassword(
        `${req.user._json.sub}+${req.user._json.email}`
      );

      const { _id, email } = await User.create({
        name: req.user._json.name,
        email: req.user._json.email,
        password: hashPassword,
        avatarURL: req.user._json.picture,
        token: null,
        createdAt: formattedDate,
        updatedAt: formattedDate,
      });

      user._id = _id;

      jwt = createJWT({
        _id,
        email,
      });
    }
    await User.findOneAndUpdate(
      { _id: user._id },
      { token: jwt }
    );

    res.redirect(
      jwt
        ? `https://etopritika.github.io/team-project-7?token=${jwt}`
        : "https://etopritika.github.io/team-project-7"
    );
  }
);

router.post("/register", setUser);

router.post("/login", loginUser);

router.post("/logout", hendleJwtControler, logoutUser);

module.exports = router;
