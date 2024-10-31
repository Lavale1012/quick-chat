import React, { useEffect, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const SpeechToText = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = true;

  // Event handler when recognition starts
  recognition.onstart = () => {
    console.log("Speech recognition started");
    setIsListening(true);
  };

  // Event handler when recognition ends
  recognition.onend = () => {
    console.log("Speech recognition ended");
    setIsListening(false);
  };

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    onTranscript(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Recognition error:", event.error);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop(); 
    } else {
      recognition.start(); // This will eventually trigger onstart
    }
  };

  
  useEffect(() => {
    return () => {
      recognition.stop(); // Ensure recognition stops when component unmounts
    };
  }, []);

  return (
    <button
      onClick={toggleListening}
      className="p-3 border-none bg-gray-200 dark:text-white rounded-md dark:bg-slate-700 outline-none transition duration-300 hover:bg-slate-300 dark:hover:bg-slate-800 cursor-pointer active:bg-slate-200 dark:active:bg-slate-600"
    >
      {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
    </button>
  );
};

export default SpeechToText;
