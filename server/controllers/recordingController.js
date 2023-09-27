const Recording = require("../models/recording");

const startRecording = async (req, res, next) => {
  try {
    const { recordingURL } = req.body;
    const newRecording = await Recording.create({
      userID: req.user.id,
      recordingURL,
    });
  } catch (error) {
    console.log(error);
  }
};

const stopRecording = async (req, res, next) => {
  try {
    const updatedRecording = await Recording.findOneAndUpdate(
      { userID: req.user.id },
      { endTime: Date.now() }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { startRecording, stopRecording };
