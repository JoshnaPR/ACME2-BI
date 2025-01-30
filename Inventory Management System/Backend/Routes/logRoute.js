const express = require("express");
const logController = require("../Controllers/logController");

const router = express.Router();

router.get("/", logController.getLogs);
router.post("/", logController.createLog);

module.exports = router;