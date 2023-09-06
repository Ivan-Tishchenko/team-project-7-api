const { User, joiUserSchema } = require("../models/user");

const {
  createHashPassword,
} = require("../helpers/hashPassword");

const gravatar = require("gravatar");

const { createJWT } = require("./jwt");

const setUser = async (req, res, next) => {
  try {
    const { error } = joiUserSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message });
      return;
    }

    const password = await createHashPassword(
      req.body.password
    )
      .then((data) => data)
      .catch((error) => console.log(error.message));

    const avatarURL = gravatar.url(req.body.email);

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password,
      avatarURL,
      token: null,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    };

    const { _id } = await User.create(userData);

    const token = createJWT({
      id: _id,
      email: req.body.email,
    });

    const user = await User.findOneAndUpdate(
      { _id },
      { token }
    );

    res.status(201).json({
      _id: user.id,
      name: req.body.name,
      email: req.body.email,
      phone: user.phone,
      birthday: user.birthday,
      telegram: user.telegram,
      avatarURL,
      token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      skype: user.skype,
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(error.status).json(error.message);
  }
};

module.exports = setUser;
