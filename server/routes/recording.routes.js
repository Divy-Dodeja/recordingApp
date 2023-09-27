const express = require("express");
const router = express.Router();
const { startRecording, stopRecording } = require("../controllers/recordingController");

router.post("/startRecording", startRecording);
router.post("/stopRecording", stopRecording);

module.exports = router;
