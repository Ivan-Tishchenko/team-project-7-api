const { Task, addTaskSchema } = require("../models/tasks");

const addTask = async (req, res, next) => {
  try {
    // validation reqest body
    const { error } = addTaskSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message });
      return;
    }

    // checking the difference between start time and end time
    const [hoursStart, minutesStart] = req.body.start;
    const [hoursEnd, minutesEnd] = req.body.end;

    if (
      hoursEnd < hoursStart ||
      (hoursStart === hoursEnd &&
        minutesStart >= minutesEnd)
    ) {
      res.status(400).json({
        message: "time start must be early than time end",
      });
      return;
    }

    // create task
    const task = await Task.create(req.body);

    // response 
    task.owner.avatarURL = req.user.avatarURL;

    res.status(201).json(task);
  } catch (error) {
    console.error("Error adding Task:", error);
    res.status(500).json({ message: "Error adding Task" });
  }
};

module.exports = addTask;
