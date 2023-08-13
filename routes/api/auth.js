const express = require("express");

const setUser = require("../../user/setUser");
const loginUser = require("../../user/loginUser");
const logoutUser = require("../../user/logoutUser");
const getUser = require("../../user/getUser");
const verifyUser = require("../../user/verifyUser");
const resendEmail = require("../../user/resendEmail")

const hendleJwtControler = require("../../midlewares/hendleJwtControler");
const setNewAvatar = require("../../user/setNewAvatsr");

const upload = require("../../midlewares/hendleAvatar");

const router = express.Router();

router.post("/register", setUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/current", hendleJwtControler, getUser);

router.patch(
  "/avatars",
  hendleJwtControler,
  upload.single("picture"),
  setNewAvatar
);

router.get("/verify/:verificationTocen", verifyUser);

router.post("/verify", resendEmail)

module.exports = router;
