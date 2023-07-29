const {
  Contact,
  addContactSchema,
} = require("../models/contact");

const addContact = async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message });
      return;
    }

    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res
      .status(500)
      .json({ message: "Error adding contact" });
  }
};

module.exports = addContact;
