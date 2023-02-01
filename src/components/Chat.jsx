import React from "react";
import Camera from "../img/camera.png";
import AddFriend from "../img/addFriend.jpg";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Coti</span>
        <div className="chatIcons">
          <img src={Camera} alt="" />
          <img src={AddFriend} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
