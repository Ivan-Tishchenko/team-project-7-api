const express = require("express");

const setUser = require("../../user/setUser");
const loginUser = require("../../user/loginUser");
const logoutUser = require("../../user/logoutUser");
const getUser = require("../../user/getUser");
const updateUser = require("../../user/updateUser");

const hendleJwtControler = require("../../midlewares/hendleJwtControler");

const router = express.Router();

router.post("/register", setUser);

router.post("/login", loginUser);

router.post("/logout", hendleJwtControler, logoutUser);

router.get("/current", hendleJwtControler, getUser);

router.patch("/user", hendleJwtControler, updateUser);

module.exports = router;
