const { Contact } = require("../models/contact");

async function getAllContacts(req, res, next) {
  const contacts = await Contact.find();
  res.send(contacts);
}

module.exports = getAllContacts;