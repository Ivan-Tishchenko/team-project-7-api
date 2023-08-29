const { Review } = require("../models/review");

const getUserReview = async (req, res, next) => {
  const review = await Review.findOne({
    name: req.user.name,
  });

  res.status(200).json(review);
};

module.exports = getUserReview;
