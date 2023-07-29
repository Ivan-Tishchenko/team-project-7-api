const updateContactData = require("./index");

const updateFavorite = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  if (!Object.keys(body).length) {
    res
      .json({ message: "missing field favorite" })
      .status(400);
  }
  try {
    const contact = await updateContactData(id, body);

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

module.exports = updateFavorite;
