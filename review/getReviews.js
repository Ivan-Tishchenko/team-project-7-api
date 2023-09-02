const { Review } = require("../models/review");

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate("owner", "avatarURL name")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.log(error.message);
    res.status(error.status).json(error.message);
  }
};

module.exports = getReviews;
