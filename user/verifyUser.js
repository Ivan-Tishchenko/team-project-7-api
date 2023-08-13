const { User } = require("../models/user");

const verifyUser = async (req, res, next) => {
  const verificationToken = req.params.verificationTocen;

  const user = await User.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
      verify: true,
    }
  );

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  res.status(200).json({ message: "verify successful" });
};

module.exports = verifyUser;
