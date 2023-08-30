const { Review } = require("../models/review");

const getUserReview = async (req, res, next) => {
  const review = await Review.findOne({
    owner: req.user._id,
  }).populate("owner", "avatarURL name");

  res.status(200).json(review);
};

module.exports = getUserReview;
