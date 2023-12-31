const { Review, reviewJoiSchema } = require("../models/review");

const createUserReview = async (req, res, next) => {
  try {
    const { error } = reviewJoiSchema.validate(req.body);
     if (error) {
       res
         .status(400)
         .json({ message: error.details[0].message });
       return;
     }

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
      ![1, 2, 3, 4, 5].includes(req.body.rating)
    ) {
      res.status(400).json({
        message:
          "rating is not valid. must be one of [1,2,3,4,5]",
      });
      return;
    }

    const review = {
      owner: req.user._id,
      text: req.body.text,
      rating: req.body.rating,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    };

    const createdReview = await Review.create(review);

    res.status(201).json({
      text: req.body.text,
      rating: req.body.rating,
      createdAt: formattedDate,
      updatedAt: createdReview.updatedAt,
      owner: {
        name: req.user.name,
        avatarURL: req.user.avatarURL,
        _id: req.user._id,
      },
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(error.status).json(error.message);
  }
};

module.exports = createUserReview;
