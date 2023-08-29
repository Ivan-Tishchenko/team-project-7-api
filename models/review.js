const { Schema, model } = require("mongoose");
const hendleMongodbError = require("../helpers/hendleMongodbError");

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
    text: {
      type: String,
      maxlength: 250,
      required: [true, "text is required"],
    },
    rating: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
      required: [true, "rating is required"],
    },
    avatarURL: {
      type: String,
      required: [true, "avatar is required"],
    },
    createdAt: {
      type: String,
      required: [true, "created at is required"],
    },
    updatedAt: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

reviewSchema.post("save", hendleMongodbError);

const Review = model("review", reviewSchema);

module.exports = { Review };
