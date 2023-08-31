const { Schema, model } = require("mongoose");

const Joi = require("joi");

const dataPattern =
  /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const addTaskSchema = Joi.object({
  title: Joi.string().max(250).required(),
  start: Joi.string().pattern(timePattern).required(),
  end: Joi.string().pattern(timePattern).required(),
  priority: Joi.string().required(),
  date: Joi.string().pattern(dataPattern).required(),
  category: Joi.string().required(),
});

const taskSchema = new Schema(
  {
    title: {
      type: String,
      maxLength: 250,
      required: true,
    },
    start: {
      type: String,
      match: timePattern,
      required: true,
    },
    end: {
      type: String,
      match: timePattern,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    date: {
      type: String,
      match: dataPattern,
      required: true,
    },
    category: {
      type: String,
      enum: ["to-do", "in-progress", "done"],
      required: true,
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

const Task = model("task", taskSchema);

module.exports = {
  Task,
  addTaskSchema,
};
