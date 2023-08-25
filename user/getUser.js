const getUser = async (req, res, next) => {
  const { email, name, avatarURL, subscription } = req.user;
  res.json({ name, email, subscription, avatarURL });
};

module.exports = getUser;
