const jwt = require("jsonwebtoken");

const SECRET_WORD = "secretWord";

const createJWT = (payload) => {
  const token = jwt.sign(payload, SECRET_WORD);
  return token;
};

const verificationJWT = (token) => {
  const isJwtTrue = jwt.verify(token, SECRET_WORD);
  return isJwtTrue;
};

const decodeJwt = (token) => {
  return jwt.decode(token);
}

module.exports = {createJWT, verificationJWT, decodeJwt}