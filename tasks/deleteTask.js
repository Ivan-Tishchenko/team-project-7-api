const { Task } = require("../models/tasks");

const deleteTask = async (req, res, next) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.Id,
  });
  if (task) {
    res.send(task);
  } else {
    res.status(404);
    res.send({ message: "Not found" });
  }
};

module.exports = deleteTask;
