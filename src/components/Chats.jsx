import React from "react";
import profilePhoto from "../img/profile.png";

const Chats = () => {
  return (
    <div className="chats">
      <div className="userChat">
        <img src={profilePhoto} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={profilePhoto} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={profilePhoto} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
