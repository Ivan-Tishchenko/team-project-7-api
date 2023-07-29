const { Contact } = require("../models/contact");

async function getContactById(req, res, next) {
  const contact = await Contact.findOne({
    _id: req.params.contactId,
  });
  if (contact) {
    res.send(contact);
  } else {
    res.status(404);
    res.send({ message: "Not found" });
  }
}

module.exports = getContactById;
