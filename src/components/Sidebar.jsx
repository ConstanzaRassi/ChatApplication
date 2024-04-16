import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

function Sidebar({ handleChatSelect }) {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats handleChatSelect={handleChatSelect} />
    </div>
  );
}

export default Sidebar;
