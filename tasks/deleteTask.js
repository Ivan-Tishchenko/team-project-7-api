const { Task } = require("../models/tasks");

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.taskId,
    }).populate("owner", "avatarURL");
    if (
      req.user._id.id.toString() !==
      task.owner._id.id.toString()
    ) {
      res.status(400).json({
        message: "authorithed user not owner this task",
      });
      return;
    }

    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.taskId,
    });
    console.log(deletedTask);
    if (deletedTask) {
      res.status(204).send();
    } else {
      res.status(404);
      res.send({ message: "Not found" });
    }
  } catch (error) {
    console.error("Error adding Task:", error);
    res.status(500).json({ message: "Error adding Task" });
  }
};

module.exports = deleteTask;
