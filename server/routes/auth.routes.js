const express = require("express");
const router = express.Router();
const { registerLoginUser } = require("../controllers/authContoller");

router.post("/", registerLoginUser);

module.exports = router;
