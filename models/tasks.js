const { Schema, model } = require("mongoose");

const Joi = require("joi");

const dataPattern =
  /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
const timePattern = /^([01]?\d|2[0-3]):([0-5]\d)$/;

const validateStartEndTime = (obj, helpers) => {
  function toMinute(time) {
    const arrTime = time.split(":");
    return Number(arrTime[0]) * 60 + Number(arrTime[1]);
  }
  const { start, end } = obj;

  if (toMinute(start) >= toMinute(end)) {
    return helpers.error("any.invalid");
  }
};

const priorityType = ["low", "medium", "high"];
const categoryType = ["to-do", "in-progress", "done"];

const addTaskSchema = Joi.object({
  title: Joi.string().max(250).required().messages({
    "string.base": "The title must be a string",
    "string.max": "The title must be max 250",
    "any.required": "The title field a required",
  }),
  start: Joi.string()
    .pattern(timePattern)
    .min(5)
    .max(5)
    .required()
    .messages({
      "string.base": "The start must be a string",
      "string.pattern.base": `The field "start" must be of the following type "hh:mm"`,
      "any.required": "The start field a required",
    }),
  end: Joi.string()
    .pattern(timePattern)
    .min(5)
    .max(5)
    .required()
    .messages({
      "string.base": "The end must be a string",
      "string.pattern.base": `The field "end" must be of the following type "hh:mm"`,
      "any.required": "The end field a required",
    }),
  priority: Joi.string()
    .valid(...priorityType)
    .required()
    .messages({
      "string.base": "The priority must be a string",
      "string.valid": ` must equal one of [${priorityType.join(
        ", "
      )}]`,
      "any.required": "The priority field a required",
    }),
  date: Joi.string()
    .pattern(dataPattern)
    .min(10)
    .max(10)
    .required()
    .messages({
      "string.base": "The date must be a string",
      "string.pattern.base": `The field "date" must be of the following type "YYYY-MM-DD"`,
      "any.required": "The date field a required",
    }),
  category: Joi.string()
    .valid(...categoryType)
    .required()
    .messages({
      "string.base": "The category must be a string",
      "string.valid": `The caategory must equal one of [${categoryType.join(
        ", "
      )}]`,
      "any.required": "The category field a required",
    }),
})
  .custom(validateStartEndTime)
  .messages({
    "any.invalid": `The following condition must be met start<end`,
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
      validate: {
        validator: function (value) {
          const [hoursStart, minutesStart] =
            value.split(":");
          const [hoursEnd, minutesEnd] =
            this.end.split(":");

          if (
            parseInt(hoursStart) >
              parseInt(hoursEnd) ||
            (parseInt(hoursStart) ===
              parseInt(hoursEnd) &&
              parseInt(minutesStart) >=
                parseInt(minutesEnd))
          ) {
            return false;
          }
          return true;
        },
        message: "start must be earlier than end",
      },
    },
    end: {
      type: String,
      match: timePattern,
      required: true,
    },
    priority: {
      type: String,
      enum: priorityType,
      required: true,
    },
    date: {
      type: String,
      match: dataPattern,
      required: true,
    },
    category: {
      type: String,
      enum: categoryType,
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
