const { User } = require("../models/user");

const fs = require("fs");

const Jimp = require("jimp");

const setNewAvatar = async (req, res, next) => {
  Jimp.read(`tmp/${req.file.filename}`, (error, image) => {
    if (error) {
      throw error;
    }
    image
      .resize(250, 250)
      .write(`public/avatars/${req.file.filename}`);
  });
  try {
    fs.unlinkSync(`tmp/${req.file.filename}`);
  } catch (error) {
    console.log(error.message);
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      ...req.body.user,
      avatarURL: `/avatars/${req.file.filename}`,
    }
  );

  res.status(201).json(user);
};

module.exports = setNewAvatar;
