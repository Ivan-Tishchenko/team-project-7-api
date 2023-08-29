const { Review } = require("../models/review");

const deleteUserReview = async (req, res, next) => {
  const review = await Review.findOneAndDelete({
    name: req.user.name,
  });
  res.status(204).json(review);
};

module.exports = deleteUserReview;
