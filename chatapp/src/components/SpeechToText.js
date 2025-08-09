import React, { useEffect, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const SpeechToText = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  useEffect(() => {
    if (recognition) {
      recognition.continuous = false;
      recognition.interimResults = true;

      // Event handler when recognition starts
      recognition.onstart = () => {
        if (process.env.NODE_ENV === 'development') {
          console.log("Speech recognition started");
        }
        setIsListening(true);
      };

      // Event handler when recognition ends
      recognition.onend = () => {
        if (process.env.NODE_ENV === 'development') {
          console.log("Speech recognition ended");
        }
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
        if (process.env.NODE_ENV === 'development') {
          console.error("Recognition error:", event.error);
        }
        setIsListening(false);
      };
    }
  }, [recognition, onTranscript]);

  const toggleListening = () => {
    if (!isSupported || !recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Safari, or Edge.');
      return;
    }

    if (isListening) {
      recognition.stop(); 
    } else {
      try {
        recognition.start();
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Error starting speech recognition:", error);
        }
        setIsListening(false);
      }
    }
  };

  
  useEffect(() => {
    return () => {
      if (recognition && isListening) {
        recognition.stop();
      }
    };
  }, [recognition, isListening]);

  if (!isSupported) {
    return (
      <button
        disabled
        className="p-3 border-none bg-gray-300 text-gray-500 rounded-md cursor-not-allowed opacity-50"
        title="Speech recognition not supported in this browser"
      >
        <FaMicrophone />
      </button>
    );
  }

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