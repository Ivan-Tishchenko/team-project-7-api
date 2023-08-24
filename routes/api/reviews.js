const express = require("express");

const router = express.Router();

router.get("/");

router.get("/own");

router.post("/own");

router.patch("/own");

router.delete("/own");

module.exports = router;
