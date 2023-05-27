import React, { useContext } from "react";
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
  if (data == null || data === undefined) {
    return (
      <div className="chat">
        <div className="chatInfo"></div>
      </div>
    );
  } else {
    return (
      <div className="chat">
        <div className="chatInfo">
          <div className="chatUser">
            <img src={data.user?.photoURL} alt="" />
            <span>{data.user?.displayName}</span>
          </div>

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
  }
};

export default Chat;
