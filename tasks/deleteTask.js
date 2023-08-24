const { Task } = require("../models/tasks");

const deleteTask = async (req, res, next) => {
  const contact = await Task.findOneAndDelete({
    _id: req.params.Id,
  });
  if (contact) {
    res.send(contact);
  } else {
    res.status(404);
    res.send({ message: "Not found" });
  }
};

module.exports = deleteTask;
