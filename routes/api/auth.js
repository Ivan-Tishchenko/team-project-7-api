const express = require("express");

const setUser = require("../../user/setUser");
const loginUser = require("../../user/loginUser");
const logoutUser = require("../../user/logoutUser");
const getUser = require("../../user/getUser");
const updateUser = require("../../user/updateUser")
// const verifyUser = require("../../user/verifyUser");
// const resendEmail = require("../../user/resendEmail")

const hendleJwtControler = require("../../midlewares/hendleJwtControler");


const router = express.Router();

router.post("/register", setUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/current", hendleJwtControler, getUser);

router.patch(
  "/user",
  hendleJwtControler,
  updateUser
);

// router.get("/verify/:verificationTocen", verifyUser);

// router.post("/verify", resendEmail)

module.exports = router;
