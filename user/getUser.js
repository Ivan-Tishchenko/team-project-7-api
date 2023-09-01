const getUser = async (req, res, next) => {
  try {
    const {
      email,
      name,
      avatarURL,
      phone,
      birthday,
      createdAt,
      updatedAt,
      telegram,
      token,
      _id,
    } = req.user;
    res.json({
      name,
      email,
      avatarURL,
      phone,
      birthday,
      createdAt,
      updatedAt,
      telegram,
      token,
      _id,
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(error.status).json(error.message);
  }
};

module.exports = getUser;
