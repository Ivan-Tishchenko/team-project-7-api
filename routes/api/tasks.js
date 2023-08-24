const express = require("express");

const getAllTask = require("../../tasks/getAllTask");
const addTask = require("../../tasks/addTask");
const deleteTask = require("../../tasks/deleteTask");
const updateTask = require("../../tasks/updateTask");

const hendleJwtControler = require("../../midlewares/hendleJwtControler");

const router = express.Router();

router.get("/", hendleJwtControler, getAllTask);

router.post("/", hendleJwtControler, addTask);

router.delete("/:Id", hendleJwtControler, deleteTask);

router.patch("/:Id", hendleJwtControler, updateTask);

module.exports = router;
