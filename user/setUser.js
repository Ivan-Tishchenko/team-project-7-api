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

    const token = createJWT({
      id: req.body.id,
      email: req.body.email,
    });

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password,
      avatarURL,
      token,
    };

    await User.create(userData);

    res.status(201).json({
      token,
      user: {
        name: req.body.name,
        email: req.body.email,
        avatarURL,
      },
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(error.status).json(error.message);
  }
};

module.exports = setUser;
