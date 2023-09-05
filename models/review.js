const Joi = require("joi");
const { Schema, model } = require("mongoose");
const hendleMongodbError = require("../helpers/hendleMongodbError");

const reviewJoiSchema = Joi.object({
  text: Joi.string().required().messages({
    "string.base": "The text must be type string",
    "any.required": "The text field a required",
  }),
  rating: Joi.number()
    .valid(1, 2, 3, 4, 5)
    .required()
    .messages({
      "number.message": "The rating must be type number",
      "any.required": "The rating field a required",
    }),
});

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
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

reviewSchema.post("save", hendleMongodbError);

const Review = model("review", reviewSchema);

module.exports = { Review , reviewJoiSchema};
