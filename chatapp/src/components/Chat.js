import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import FileInputButton from "./FileInputButton";
import SpeechToText from "./SpeechToText"; // Adjust the path as necessary
import imageCompression from "browser-image-compression";

import { MdDelete } from "react-icons/md";
import { IoSend } from "react-icons/io5";

function Chat({ socket, username, room, newRoom }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1, // Reduce image size to 1 MB
          maxWidthOrHeight: 1024, // Scale image dimensions to 1024px
          useWebWorker: true, // Use WebWorker for performance
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log("Compressed file size:", compressedFile.size); // Log compressed size
          setSelectedFile(reader.result); // Set the Base64 data of the compressed image
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const clearFileButton = () => {
    setSelectedFile(null);
  };

  const sendMessage = async () => {
    if (currentMessage !== "" || selectedFile) {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        image: selectedFile, // Add the Base64 encoded string of the image
      };

      // Emit the message to the server
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      setSelectedFile(null); // Clear the file after sending
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="flex flex-col  bg-gray-100   lg:w-[70%] max-w-[90%] h-[35rem] dark:bg-black rounded-xl mb-36 resize-none transition duration-300 ">
      <div className="chat-header bg-gray-200 dark:bg-gray-900 p-4 text-white font-bold flex items-center justify-between rounded-t-xl transition duration-300">
        <p className="text-gray-400 dark:text-white transition duration-300">{`Room: ${room}`}</p>
        <button
          className="bg-green-500 p-2 rounded-md hover:bg-green-600 transition duration-300 active:bg-green-400"
          onClick={newRoom}
        >
          <h3>New Room</h3>
        </button>
      </div>
      <ScrollToBottom className="chat-messages flex-1 overflow-auto p-4 transition duration-300">
        {messageList.map((messageContent, index) => (
          <div
            className={`flex my-2 ${
              username === messageContent.author
                ? "justify-end"
                : "justify-start"
            }`}
            key={index}
          >
            <div
              className="rounded-lg px-4 py-2 text-white max-w-xs flex flex-col"
              style={{
                backgroundColor:
                  username === messageContent.author ? "#4F46E5" : "#10B981",
              }}
            >
              {messageContent.message && <p>{messageContent.message}</p>}
              {messageContent.image && (
                <img
                  src={messageContent.image}
                  alt="Sent"
                  className="max-w-full h-auto rounded-lg mt-2" // Tailwind CSS classes for responsive image
                />
              )}
              <div className="text-right text-xs mt-2">
                <span>{messageContent.time}</span> |{" "}
                <span>{messageContent.author}</span>
              </div>
            </div>
          </div>
        ))}
      </ScrollToBottom>

      <div className="flex chat-footer p-4 flex-wrap justify-between items-center gap-2">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyPress={(event) => event.key === "Enter" && sendMessage()}
          className="  flex-1   min-w-10 p-2 border-none dark:text-white rounded-md dark:bg-slate-700 outline-none transition duration-300"
        />

        <SpeechToText
          onTranscript={(transcript) =>
            setCurrentMessage(currentMessage + transcript)
          }
        />

        <div className="flex items-center gap-2">
          {!selectedFile ? (
            <FileInputButton
              onFileSelect={handleFileChange}
              selectedFile={selectedFile}
            />
          ) : (
            <button
              className="p-3 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300 active:bg-red-500"
              onClick={clearFileButton}
            >
              <MdDelete />
            </button>
          )}
        </div>
        <button
          onClick={sendMessage}
          className=" bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-300 active:bg-green-400"
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
