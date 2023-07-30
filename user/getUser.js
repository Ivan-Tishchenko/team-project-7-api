const getUser = async (req, res, next) => {
  res.json(req.user);
};

module.exports = getUser;
