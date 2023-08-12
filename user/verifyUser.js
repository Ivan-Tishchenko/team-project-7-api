const { User } = require("../models/user");

const verifyUser = async (req, res, next) => {
  const verificationToken = req.params.verificationTocen;

  await User.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
      verify: true,
    }
  );

  res.status(200).json({ message: "verify successful" });
};

module.exports = verifyUser;
