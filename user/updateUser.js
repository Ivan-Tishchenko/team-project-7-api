const { User } = require("../models/user");

const updateUser = async (req, res, next) => {
  try {
    const { email, name, phone, birthday, skype } =
      req.body;

    const avatarURL = req.file?.path;

    const updateData = {
      email: req.user.email,
      name: req.user.name,
      avatarURL: req.user.avatarURL,
      phone: req.user.phone,
      birthday: req.user.birthday,
      updatedAt: req.user.updatedAt,
      skype: req.user.skype,
    };

    let isUpdateNeed = false;

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
    if (!!phone && phone !== req.user.phone) {
      updateData.phone = phone;
      isUpdateNeed = true;
    }
    if (!!birthday && birthday !== req.user.birthday) {
      updateData.birthday = birthday;
      isUpdateNeed = true;
    }
    if (!!skype && skype !== req.user.skype) {
      updateData.skype = skype;
      isUpdateNeed = true;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    updateData.updatedAt = formattedDate;

    if (!isUpdateNeed) {
      res.status(201).json({ ...updateData });
      return;
    }

    await User.findOneAndUpdate(
      { _id: req.user._id },
      updateData
    );

    res.status(201).json({
      ...updateData,
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(error.status).json(error.message);
  }
};

module.exports = updateUser;
