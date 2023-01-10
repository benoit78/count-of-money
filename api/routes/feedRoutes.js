const express = require("express");
const feedController = require("../controllers/feedController");

const router = express.Router({ mergeParams: true });

router.get( "/",  feedController.getFeed);

module.exports = router;