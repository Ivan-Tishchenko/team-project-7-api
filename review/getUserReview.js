const { Review } = require("../models/review");

const getUserReview = async (req, res, next) => {
  const review = await Review.findOne({
    owner: req.user._id,
  }).populate("owner", "avatarURL name");

  res.status(200).json({
    _id: review?._id,
    rating: review?.rating,
    text: review?.text,
    owner: review?.owner,
    createdAt: review?.createdAt,
    updatedAt: review?.updatedAt,
  });
};

module.exports = getUserReview;
