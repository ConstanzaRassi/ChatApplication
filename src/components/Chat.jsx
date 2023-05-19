import React, { useContext } from "react";
import Camera from "../img/camera.png";
import AddFriend from "../img/addFriend.jpg";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import {
  BsCameraVideoFill,
  BsFillTelephoneFill,
  BsThreeDotsVertical,
} from "react-icons/bs";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <BsFillTelephoneFill />
          <BsCameraVideoFill />
          <BsThreeDotsVertical />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
