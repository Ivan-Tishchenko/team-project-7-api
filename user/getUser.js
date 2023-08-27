const getUser = async (req, res, next) => {
  const {
    email,
    name,
    avatarURL,
    phone,
    birthday,
    createdAt,
    updatedAt,
    skype,
    token,
  } = req.user;
  res.json({
    name,
    email,
    avatarURL,
    phone,
    birthday,
    createdAt,
    updatedAt,
    skype,
    token,
  });
};

module.exports = getUser;
