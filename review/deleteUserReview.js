const { Review } = require("../models/review");

const deleteUserReview = async (req, res, next) => {
  const review = await Review.findOneAndDelete({
    userId: req.user._id,
  });

  if (!review) {
    res.status(404).json({ message: "review not found" });
    return;
  }

  res.status(204).json({ message: "Successful operation" });
};

module.exports = deleteUserReview;
