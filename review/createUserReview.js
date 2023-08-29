const { Review } = require("../models/review");

const createUserReview = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    if (!req.body.text) {
      res.status(400).json({
        message: "not transfered text",
      });
      return;
    }

    if (
      !req.body.rating ||
      !["1", "2", "3", "4", "5"].includes(req.body.rating)
    ) {
      res.status(400).json({
        message:
          "rating is not valid. must be one of ['1', '2', '3', '4', '5']",
      });
      return;
    }

    const review = {
      name: req.user.name,
      userID: req.user._id,
      text: req.body.text,
      rating: req.body.rating,
      avatarURL: req.user.avatarURL,
      createdAt: formattedDate,
    };

    const createdReview = await Review.create(review);

    res.status(201).json(createdReview);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(error.status).json(error.message);
  }
};

module.exports = createUserReview;
