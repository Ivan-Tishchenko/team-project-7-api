const { User, joiUserSchema } = require("../models/user");

const { createHashPassword } = require("./index");

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

    const userData = {
      email: req.body.email,
      password,
    };

    const user = await User.create(userData);
    res.status(201).json({
      user: {
        email: req.body.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(error.status).json(error.message);
  }
};

module.exports = setUser;
