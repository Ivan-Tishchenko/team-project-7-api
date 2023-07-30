const { Schema, model } = require("mongoose");

const hendleMongodbError = require("../helpers/hendleMongodbError");

// const bCrypt = require("bcryptjs");

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
      unique: [true, "email in use"],
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
  }
);

userSchema.post("save", hendleMongodbError);

const joiUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

// userSchema.methods.setPassword = function (password) {
//   this.password = bCrypt.hashSync(
//     password,
//     bCrypt.genSaltSync(6)
//   );
// };

// userSchema.methods.validPassword = function (password) {
//   return bCrypt.compareSync(password, this.password);
// };

const User = model("user", userSchema);

module.exports = {
  User,
  joiUserSchema,
};
