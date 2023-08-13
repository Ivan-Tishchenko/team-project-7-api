const { User } = require("../models/user");
const sendMail = require("../email/sendMail");

const resendEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    res
      .status(400)
      .json({ message: "missing required field email" });
    return;
  }

  const user = await User.findOne({ email });

  if (user.verify) {
    res.status(400).json({
      message: "Verification has already been passed",
    });
    return;
  }

  await sendMail(email, user.verificationToken);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;
