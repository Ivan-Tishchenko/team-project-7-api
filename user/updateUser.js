const { User, joiUserSchema } = require("../models/user");

const updateUser = async (req, res, next) => {
  const { email, name } = req.body;
  const avatarURL = req.file?.path;

  const updateData = {};

  if (!!email && email !== req.user.email) {
    updateData.email = email;
  }
  if (!!name && name !== req.user.name) {
    updateData.name = name;
  }
  if (avatarURL) {
    updateData.avatarURL = avatarURL;
  }

  await User.findOneAndUpdate(
    { _id: req.user._id },
    updateData
  );
  res.status(201).json({
    ...req.user,
    ...updateData,
  });
};

module.exports = updateUser;
