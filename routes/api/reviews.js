const express = require("express");

const hendleJwtControler = require("../../midlewares/hendleJwtControler");
const createUserReview = require("../../review/createUserReview");
const deleteUserReview = require("../../review/deleteUserReview");

const getReviews = require("../../review/getReviews");
const getUserReview = require("../../review/getUserReview");
const updateUserReview = require("../../review/updateUserReview");

const router = express.Router();

router.get("/", getReviews);

router.get("/own", hendleJwtControler, getUserReview);

router.post("/own", hendleJwtControler, createUserReview);

router.patch("/own", hendleJwtControler, updateUserReview);

router.delete("/own", hendleJwtControler, deleteUserReview);

module.exports = router;
