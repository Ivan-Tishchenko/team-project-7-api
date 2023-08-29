const { Schema, model } = require("mongoose");

const hendleMongodbError = require("../helpers/hendleMongodbError");

const Joi = require("joi");

const emailRegexp =
  /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 8,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    phone: {
      type: String,
      default: null,
    },
    birthday: { type: String, default: null },
    skype: { type: String, default: null },
    createdAt: { type: String, default: Date.now() },
    updatedAt: { type: String, default: null },
  },
  {
    versionKey: false,
  }
);

userSchema.post("save", hendleMongodbError);

const joiUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().required(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

const User = model("users", userSchema);

module.exports = {
  User,
  joiUserSchema,
  loginJoiSchema,
};
