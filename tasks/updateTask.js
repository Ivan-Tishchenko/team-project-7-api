const { addTaskSchema } = require("../models/tasks");

const updateTaskData = require("./index");

const updateTask = async (req, res, next) => {
  const id = req.params.Id;
  const body = req.body;
  try {
    const newData = req.body;
    const { error } = addTaskSchema.validate(newData);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message });
      return;
    }

    const task = await updateTaskData(id, body);

    if (!task) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res
      .status(500)
      .json({ message: "Error updating task" });
  }
};

module.exports = updateTask;
