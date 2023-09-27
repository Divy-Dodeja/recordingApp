const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordingSchema = new Schema({
  userID: Schema.Types.ObjectId,
  startTime: {
    type: Date,
    default: Date.now,
  },
  recordingURL: String,
  endTime: {
    type: Date,
    default: Date.now,
  },
});

const RecordingModel = mongoose.model("Recording", recordingSchema);
module.exports = RecordingModel;
