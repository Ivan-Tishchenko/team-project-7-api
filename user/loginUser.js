const { User, joiUserSchema } = require("../models/user");

const loginUser = async (req, res, next) => {
  try {
    const { error } = joiUserSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message });
      return;
    }

    const user = await User.findOne({
      email: req.body.email,
    });


    res.json(user);
  } catch (error) {
    console.error("Error creating user", error);
    res
      .status(500)
      .json({ message: "Error creating user" });
  }
};

module.exports = loginUser;
