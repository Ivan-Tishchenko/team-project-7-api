const { Task } = require("../models/tasks");

async function getAllTasks(req, res, next) {
  try {
    const taskdate = req.params.date;

    const tasks = await Task.find({
      owner: req.user._id,
      date: { $regex: taskdate, $options: "i" },
    }).populate("owner", "avatarURL");
    res.send(tasks);
  } catch (error) {
    console.error("Error adding Task:", error);
    res.status(500).json({ message: "Error adding Task" });
  }
}

module.exports = getAllTasks;
