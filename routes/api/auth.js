const express = require("express");

const setUser = require("../../user/setUser");
const loginUser = require("../../user/loginUser");
const logoutUser = require("../../user/logoutUser");
const getUser = require("../../user/getUser");
const updateUser = require("../../user/updateUser");

const hendleJwtControler = require("../../midlewares/hendleJwtControler");
const upload = require("../../midlewares/cloudinary/upload");

const router = express.Router();

router.post("/register", setUser);

router.post("/login", loginUser);

router.post("/logout", hendleJwtControler, logoutUser);

router.get("/current", hendleJwtControler, getUser);

router.patch(
  "/user",
  hendleJwtControler,
  async (req, res, next) => {
    // console.log(req);
    console.log(req.body);
    console.log(req.file?.filename);
    next();
  },
  upload.single("avatar"),
  updateUser
);

module.exports = router;
