const express = require("express");

const setUser = require("../../user/setUser");
const loginUser = require("../../user/loginUser");
const logoutUser = require("../../user/logoutUser");
const getUser = require("../../user/getUser");

const hendleJwtControler = require("../../helpers/hendleJwtControler");

const router = express.Router();

router.post("/register", setUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/current", hendleJwtControler, getUser);

module.exports = router;
