const { Task } = require("../models/tasks");

async function getAllTasks(req, res, next) {
  const tasks = await Task.find();
  res.send(tasks);
}

module.exports = getAllTasks;
