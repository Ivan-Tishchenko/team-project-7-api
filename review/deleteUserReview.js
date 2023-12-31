const { Review } = require("../models/review");

const deleteUserReview = async (req, res, next) => {
  try {
    const review = await Review.findOneAndDelete({
      owner: req.user._id,
    });

    if (!review) {
      res.status(404).json({ message: "review not found" });
      return;
    }

    res
      .status(204)
      .json({ message: "Successful operation" });
  } catch (error) {
    console.log(error.message);
    res.status(error.status).json(error.message);
  }
};

module.exports = deleteUserReview;
