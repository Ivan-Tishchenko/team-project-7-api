const { Task } = require("../models/tasks");

async function updateTaskData(id, body) {
  return await Task.findOneAndUpdate(
    { _id: id },
    body,
    { new: true }
  );
}

module.exports = updateTaskData;
