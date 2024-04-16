import React, { useState, useEffect } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import ChatDefault from "../components/ChatDefault";

const Home = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
  };
  const handleEscKey = (event) => {
    if (event.keyCode === 27) {
      setSelectedChat(null);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);
  return (
    <div className="home">
      <div className="container">
        <Sidebar handleChatSelect={handleChatSelect} />
        {selectedChat ? <Chat /> : <ChatDefault />}
      </div>
    </div>
  );
};

export default Home;
