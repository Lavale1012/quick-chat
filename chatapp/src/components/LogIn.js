import React from "react";

function Login({ socket, setShowChat, setUsername, setRoom }) {
  const [usernameLocal, setUsernameLocal] = React.useState("");
  const [roomLocal, setRoomLocal] = React.useState("");

  const joinRoom = () => {
    if (usernameLocal !== "" && roomLocal !== "") {
      socket.emit("join_room", roomLocal);
      setUsername(usernameLocal);
      setRoom(roomLocal);
      setShowChat(true);
    }
  };

  return (
    <div className="joinChatContainer flex flex-col text-center mb-44">
      <h3 className="animate-bounce text-3xl mb-4 dark:text-white transition duration-300">
        Quick Chat
      </h3>
      <input
        type="text"
        placeholder="Username..."
        className="transition duration-300 w-60 h-10 bg-slate-100 dark:bg-slate-800 my-2 border-none rounded-md p-1 text-base dark:text-white"
        onChange={(event) => {
          setUsernameLocal(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room ID..."
        className="transition duration-300 w-60 h-10 bg-slate-100 dark:bg-slate-800 my-2 border-none rounded-md p-1 text-base dark:text-white"
        onChange={(event) => {
          setRoomLocal(event.target.value);
        }}
      />
      <button
        onClick={joinRoom}
        className="transition duration-300 w-60 h-12 my-2 border-none rounded-md p-1 text-base bg-blue-600 text-white cursor-pointer hover:bg-blue-700 active:bg-blue-500"
      >
        Join A Room!
      </button>
    </div>
  );
}

export default Login;
