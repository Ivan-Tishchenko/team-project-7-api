const { Review } = require("../models/review");

const updateUserReview = async (req, res, next) => {
  try {
    const newReview = {};

    const { rating, text } = req.body;

    if (rating) {
      if (!["1", "2", "3", "4", "5"].includes(rating)) {
        res.status(400).json({
          message:
            "rating is not valid. must be one of ['1', '2', '3', '4', '5']",
        });
        return;
      }
      newReview.rating = rating;
    }
    if (text) {
      newReview.text = text;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    newReview.updatedAt = formattedDate;

    const review = await Review.findOneAndUpdate(
      { userID: req.user._id },
      newReview
    ).populate("owner", "avatarURL name");

    res.status(201).json({
      _id: review._id,
      text: review.text,
      rating: review.rating,
      createdAt: review.createdAt,
      owner: review.owner,
      ...newReview,
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(error.status).json(error.message);
  }
};

module.exports = updateUserReview;
