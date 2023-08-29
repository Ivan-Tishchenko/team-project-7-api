const { Review } = require("../models/review");

const updateUserReview = async (req, res, next) => {
  const newReview = {};

  const { rating, text } = req.body;

  if (rating) {
    newReview.rating = rating;
  }
  if (text) {
    newReview.text = text;
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  newReview.updatedAt = formattedDate;

  const review = await Review.findOneAndUpdate(
    { name: req.user.name },
    newReview
  );

  res.status(201).json({
    ...review,
    ...newReview,
  });
};

module.exports = updateUserReview;
