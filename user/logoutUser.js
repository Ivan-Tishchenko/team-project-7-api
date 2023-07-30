const { User } = require("../models/user");

const { decodeJwt } = require("./jwt");

const logoutUser = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(" ");

  const { email, id } = decodeJwt(token);

  console.log(email);

  const user = await User.findOneAndUpdate(
    { _id: id },
    { token: null },
    { new: true }
  );

  if (!user) {
    res.status(204);
  }

  res.status(201).json(user);
};

module.exports = logoutUser;
