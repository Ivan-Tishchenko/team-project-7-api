const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Review = model("review", reviewSchema);

module.exports = { Review };
