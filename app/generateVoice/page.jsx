// pages/index.js

"use client";  // Use client-side rendering
import { useState, useEffect } from "react";
import { Layout } from "../layout/page";

export default function Home() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]); // Default to the first voice
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSpeak = () => {
    if (text.trim()) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Create an AudioContext to capture speech output
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const dest = audioContext.createMediaStreamDestination();
      const mediaRecorder = new MediaRecorder(dest.stream);

      // Start recording
      mediaRecorder.start();
      
      // When the speech ends, stop recording and create a download link
      utterance.onend = () => {
        mediaRecorder.stop();
      };

      mediaRecorder.ondataavailable = (event) => {
        const audioBlob = event.data;
        setAudioBlob(audioBlob);

        // Generate a URL for the audio blob
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      // Connect the speech synthesis to the destination (audio context)
      const source = audioContext.createMediaElementSource(utterance);
      source.connect(dest);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceChange = (event) => {
    const selectedVoiceIndex = event.target.value;
    setSelectedVoice(voices[selectedVoiceIndex]);
  };

  const downloadAudio = () => {
    if (audioBlob) {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = "spoken_text.wav";  // You can change the file extension here if needed
      link.click();
    }
  };

  return (
    <div>
      <Layout>
          <div className="flex flex-col items-center justify-center min-h-screen bg-backgroundDark text-backgroundDark">
          <h1 className="text-2xl font-bold mb-4">Text-to-Speech with Download Functionality</h1>

          <textarea
            value={text}
            onChange={handleTextChange}
            className="border p-2 mb-4"
            rows="4"
            cols="50"
            placeholder="Type something to speak..."
          />

          <select
            onChange={handleVoiceChange}
            className="border p-2 mb-4"
            value={voices.indexOf(selectedVoice)}
          >
            {voices.map((voice, index) => (
              <option key={index} value={index}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>

          <button
            onClick={handleSpeak}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Speak Text
          </button>

          {audioUrl && (
            <button
              onClick={downloadAudio}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Download Audio
            </button>
          )}
        </div>
      </Layout>

    </div>
    
  );
}
