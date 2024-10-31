import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./components/Chat";
import DarkModeToggle from "./components/DarkModeToggle";
import LogIn from "./components/LogIn";

const socket = io.connect("http://localhost:3001");

function App() {
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const newRoom = () => {
    setShowChat(false);
    setUsername("");
    setRoom("");
  };

  return (
    <div className="dark:bg-slate-700 m-none transition duration-300">
      <div className="p-3 dark:bg-slate-700 m-none transition duration-300">
        <DarkModeToggle />
      </div>
      <div className="App w-screen min-h-screen dark:bg-slate-700 text-gray-800 font-sans grid place-items-center transition duration-300">
        {!showChat ? (
          <LogIn
            socket={socket}
            setShowChat={setShowChat}
            setUsername={setUsername}
            setRoom={setRoom}
          />
        ) : (
          <>
            <h3 className=" text-3xl mb-4 dark:text-white transition duration-300">
              Quick Chat
            </h3>
            <Chat
              socket={socket}
              username={username}
              room={room}
              newRoom={newRoom}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
