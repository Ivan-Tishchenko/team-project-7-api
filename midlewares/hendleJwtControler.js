const {
  verificationJWT,
  decodeJwt,
} = require("../user/jwt");

const { User } = require("../models/user");

const hendleJwtControler = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(" ");

  const isTokenValid = verificationJWT(token);
  if (!isTokenValid) {
    res.status(401).json({
      message: "Not authorized123",
    });
    return;
  }

  const { email } = decodeJwt(token);

  const user = await User.findOne({ email });

  if (!!user && user.token === token) {
    req.user = user;
    next();
    return;
  }

  res.status(401).json({
    message: "Not authorized",
  });
};

module.exports = hendleJwtControler;