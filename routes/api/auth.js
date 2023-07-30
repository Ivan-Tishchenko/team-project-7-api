const express = require("express");

const setUser = require("../../user/setUser");
const loginUser = require("../../user/loginUser");

const router = express.Router();

router.post("/register", setUser);

router.post("/login", loginUser);

module.exports = router;
