const jwt = require("jsonwebtoken");

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_WORD);
  return token;
};

const verificationJWT = (token) => {
  const isJwtTrue = jwt.verify(
    token,
    process.env.SECRET_WORD
  );
  return isJwtTrue;
};

const decodeJwt = (token) => {
  return jwt.decode(token);
};

module.exports = { createJWT, verificationJWT, decodeJwt };
