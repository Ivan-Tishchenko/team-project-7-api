const { Schema, model } = require("mongoose");

const Joi = require("joi");

const addTaskSchema = Joi.object({
  title: Joi.string().max(250).required(),
  start: Joi.string().required(),
  end: { type: String, required: true },
  priority: Joi.string().required(),
  date: Joi.string().required(),
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
      required: true,
    },
    end: { type: String, required: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["to-do", "in-progress", "done"],
      required: true,
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
