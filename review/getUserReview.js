const { Review } = require("../models/review");

const getUserReview = async (req, res, next) => {
  const review = await Review.findOne({
    owner: req.user._id,
  }).populate("owner", "avatarURL name");

  const { _id, rating, text, owner, createdAt, updatedAt } =
    review;

  console.log(req.user._id);

  res.status(200).json({
    _id,
    rating,
    text,
    owner,
    createdAt,
    updatedAt,
  });
};

module.exports = getUserReview;
