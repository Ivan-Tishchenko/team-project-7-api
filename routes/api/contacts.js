const express = require("express");

const getAllContacts = require("../../contacts/getAllContacts");
const getContactById = require("../../contacts/getContactById");
const addContact = require("../../contacts/addContact");
const deleteContact = require("../../contacts/deleteContact");
const updateContact = require("../../contacts/updateContact");
const updateFavorite = require("../../contacts/updateFavorite");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", updateFavorite);

module.exports = router;
