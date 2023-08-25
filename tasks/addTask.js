const {
  Task,
  addTaskSchema,
} = require("../models/tasks");

const addTask = async (req, res, next) => {
  try {
    const { error } = addTaskSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message });
      return;
    }

    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.error("Error adding Task:", error);
    res.status(500).json({ message: "Error adding Task" });
  }
};

module.exports = addTask;
