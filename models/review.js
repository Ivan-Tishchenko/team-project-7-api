const { Schema, model } = require("mongoose");
const hendleMongodbError = require("../helpers/hendleMongodbError");

const reviewSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "text is required"],
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: [true, "rating is required"],
    },
    createdAt: {
      type: Date,
      required: [true, "created at is required"],
    },
    updatedAt: {
      type: Date,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    versionKey: false,
  }
);

reviewSchema.post("save", hendleMongodbError);

const Review = model("review", reviewSchema);

module.exports = { Review };
