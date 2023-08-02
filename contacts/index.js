const { Contact } = require("../models/contact");

async function updateContactData(contactId, body) {
  return await Contact.findOneAndUpdate(
    { _id: contactId },
    body,
    { new: true }
  );
}

module.exports = updateContactData;
