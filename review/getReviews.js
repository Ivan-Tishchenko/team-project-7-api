const { Review } = require("../models/review");

const getReviews = async (req, res, next) => {
  const reviews = await Review.find();
  res.json(reviews);
};

module.exports = getReviews;
