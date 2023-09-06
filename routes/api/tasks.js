const express = require("express");

const getAllTask = require("../../tasks/getAllTask");
const addTask = require("../../tasks/addTask");
const deleteTask = require("../../tasks/deleteTask");
const updateTask = require("../../tasks/updateTask");

const hendleJwtControler = require("../../midlewares/hendleJwtControler");
const getAllTaskSometimes = require("../../tasks/getAllTaskSometimes");

const router = express.Router();

router.get("/", hendleJwtControler, getAllTaskSometimes)


router.get("/:date", hendleJwtControler, getAllTask);

router.post("/", hendleJwtControler, addTask);

router.delete("/:taskId", hendleJwtControler, deleteTask);

router.patch("/:taskId", hendleJwtControler, updateTask);

module.exports = router;
