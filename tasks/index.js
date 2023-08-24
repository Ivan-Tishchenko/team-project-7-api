const { Task } = require("../models/tasks");

async function updateTaskData(contactId, body) {
  return await Task.findOneAndUpdate(
    { _id: contactId },
    body,
    { new: true }
  );
}

module.exports = updateTaskData;
