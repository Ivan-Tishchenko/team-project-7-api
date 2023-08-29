const { Review } = require("../models/review");

const createUserReview = async (req, res, next) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  if (!req.body.text) {
    res.status(400).json({
      message: "not transfered text",
    });
    return;
  }

  const review = {
    name: req.user.name,
    text: req.body.text,
    avatarURL: req.user.avatarURL,
    createdAt: formattedDate,
  };

  const createdReview = await Review.create(review);

  res.status(201).json(createdReview);
};

module.exports = createUserReview;
