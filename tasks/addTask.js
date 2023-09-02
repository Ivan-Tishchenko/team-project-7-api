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
    const [hoursStart, minutesStart] =
      req.body.start.split(":");
    const [hoursEnd, minutesEnd] = req.body.end.split(":");

    if (
      parseInt(hoursEnd) < parseInt(hoursStart) ||
      (parseInt(hoursStart) === parseInt(hoursEnd) &&
        parseInt(minutesStart) >= parseInt(minutesEnd))
    ) {
      res.status(400).json({
        message: "time start must be early than time end",
      });
      return;
    }

    if (
      parseInt(hoursEnd) > 23 ||
      parseInt(hoursStart) > 23 ||
      parseInt(minutesStart) > 59 ||
      parseInt(minutesEnd) > 59
    ) {
      res
        .status(400)
        .json({ message: "start or end tim not valid" });
      return;
    }

    // formating current date
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    // add createdAT and updatedAt and owner
    req.body.createdAt = formattedDate;
    req.body.updatedAt = formattedDate;
    req.body.owner = req.user._id;

    // create task
    const task = await Task.create(req.body);

    // response
    const responseTask = {
      title: task.title,
      start: task.start,
      end: task.end,
      priority: task.priority,
      date: task.date,
      category: task.category,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      _id: task._id,
      owner: {
        _id: task.owner,
        avatarURL: req.user.avatarURL,
      },
    };

    res.status(201).json(responseTask);
  } catch (error) {
    console.error("Error adding Task:", error);
    res.status(500).json({ message: "Error adding Task" });
  }
};

module.exports = addTask;
