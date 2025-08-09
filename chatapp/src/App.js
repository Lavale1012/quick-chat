import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Chat from "./components/Chat";
import DarkModeToggle from "./components/DarkModeToggle";
import LogIn from "./components/LogIn";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [socket, setSocket] = useState(null);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    const serverUrl = process.env.REACT_APP_SERVER_URL || "https://quick-chat-7a9b.onrender.com";
    const socketInstance = io.connect(serverUrl);
    
    socketInstance.on('connect', () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Connected to server');
      }
      setConnectionError(false);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setConnectionError(true);
    });

    socketInstance.on('disconnect', (reason) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Disconnected:', reason);
      }
      if (reason === 'io server disconnect') {
        // Server disconnected, try to reconnect
        socketInstance.connect();
      }
    });

    setSocket(socketInstance);

    return () => socketInstance.close();
  }, []);

  const newRoom = () => {
    setShowChat(false);
    setUsername("");
    setRoom("");
  };

  if (connectionError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-700">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Unable to connect to the chat server. Please check your internet connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!socket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Connecting to server...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
