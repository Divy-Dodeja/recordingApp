import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(false);
  const [stream, setStream] = useState(false);
  useEffect(() => {
    if (recordingStarted) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [recordingStarted]);
  const startRecording = async () => {
    try {
      // request permissions for webcam, screen and audio
      const webCamStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      // combine streams
      const combinedStream = new MediaStream();
      combinedStream.addTrack(screenStream.getVideoTracks()[0]);
      combinedStream.addTrack(webCamStream.getVideoTracks()[1]);
      combinedStream.addTrack(webCamStream.getAudioTracks()[0]);

      const mediaRecorder = new MediaRecorder(combinedStream);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        saveRecording(url);
      };
      mediaRecorder.start();
      setStream(combinedStream);
      setMediaRecorder(mediaRecorder);
    } catch (error) {
      console.log("Error starting recording", error);
    }
  };
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      setRecordingStarted(false);
      axios.post("/stopRecording");
    }
  };

  const saveRecording = (url) => {
    // send recording data to url
    axios
      .post("/startRecording", {
        recordingURL: url,
      })
      .catch((error) => console.error("Error saving recording:", error));
  };

  return (
    <div>
      <h1>Recording Page</h1>
      {recordingStarted ? (
        <div>
          <p>Recording in progress...</p>
          <button onClick={stopRecording}>Stop</button>
        </div>
      ) : (
        <button onClick={() => setRecordingStarted(true)}>Start</button>
      )}
    </div>
  );
}
