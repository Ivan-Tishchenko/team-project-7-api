const {
  addContactSchema:  addTaskSchema,
} = require("../models/tasks");

const updateTaskData = require("./index")

const updateContact = async (req, res, next) => {
  const id = req.params.Id;
  const body = req.body;
  try {
    const newData = req.body;
    const { error } =  addTaskSchema.validate(newData);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message });
      return;
    }

    const contact = await updateTaskData(id, body);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res
      .status(500)
      .json({ message: "Error updating contact" });
  }
};

module.exports = updateContact;
