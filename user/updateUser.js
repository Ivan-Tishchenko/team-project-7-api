const { User } = require("../models/user");

const updateUser = async (req, res, next) => {
  const { email, name } = req.body;
  const avatarURL = req.file?.path;

  const updateData = {
    email: req.user.email,
    name: req.user.name,
    avatarURL: req.user.avatarURL,
  };

  let isUpdateNeed = false;

  console.log(email, req.user.email);
  if (!!email && email !== req.user.email) {
    updateData.email = email;
    isUpdateNeed = true;
  }
  if (!!name && name !== req.user.name) {
    updateData.name = name;
    isUpdateNeed = true;
  }
  if (avatarURL) {
    updateData.avatarURL = avatarURL;
    isUpdateNeed = true;
  }

  if (!isUpdateNeed) {
    res.status(400).json({message: "bad request"})
  }

  await User.findOneAndUpdate(
    { _id: req.user._id },
    updateData
  );
  res.status(201).json({
    ...updateData,
  });
};

module.exports = updateUser;
