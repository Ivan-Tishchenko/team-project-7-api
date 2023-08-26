const getUser = async (req, res, next) => {
  const { email, name, avatarURL } = req.user;
  res.json({ name, email, avatarURL });
};

module.exports = getUser;
