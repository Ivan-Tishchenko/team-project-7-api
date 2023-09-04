const { addTaskSchema, Task } = require("../models/tasks");

const updateTask = async (req, res, next) => {
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
      hoursEnd > 23 ||
      hoursStart > 23 ||
      minutesEnd > 59 ||
      minutesStart > 59
    ) {
      res
        .status(400)
        .json({ message: "start or end tim not valid" });
      return;
    }

    // formating current date
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    // validate reqest body
    const newData = req.body;
    const { error } = addTaskSchema.validate(newData);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message });
      return;
    }

    // set updatedAt
    newData.updatedAt = formattedDate;

    // update task
    const _id = req.params.taskId;
    const updatedTask = await Task.findOneAndUpdate(
      { _id },
      newData
    ).populate("owner", "avatarURL");

    // test task existence
    if (!updatedTask) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    // response
    const responseTask = {
      title: updatedTask.title,
      start: updatedTask.start,
      end: updatedTask.end,
      priority: updatedTask.priority,
      date: updatedTask.date,
      category: updatedTask.category,
      createdAt: updatedTask.createdAt,
      updatedAt: updatedTask.updatedAt,
      _id: updatedTask._id,
      owner: updatedTask.owner,
    };

    res.status(200).json({
      ...responseTask,
      ...newData,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res
      .status(500)
      .json({ message: "Error updating task" });
  }
};

module.exports = updateTask;
