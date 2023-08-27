const express = require("express");

const getUser = require("../../user/getUser");
const updateUser = require("../../user/updateUser");

const hendleJwtControler = require("../../midlewares/hendleJwtControler");
const upload = require("../../midlewares/cloudinary/upload");

const router = express.Router();

router.get("/current", hendleJwtControler, getUser);

router.patch(
  "/edit",
  hendleJwtControler,
  upload.single("avatar"),
  updateUser
);

module.exports = router;
