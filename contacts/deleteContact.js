const {
  Contact,
  addContactSchema,
} = require("../models/contact");

const deleteContact = async (req, res, next) => {
  const contact = await Contact.findOneAndDelete({
    _id: req.params.contactId,
  });
  if (contact) {
    res.send(contact);
  } else {
    res.status(404);
    res.send({ message: "Not found" });
  }
};

module.exports = deleteContact;
