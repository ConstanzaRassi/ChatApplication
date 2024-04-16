import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = ({ handleChatSelect }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          setChats(doc.data());
        } else {
          setChats([]);
        }
        setLoading(false);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (chatId, userInfo) => {
    handleChatSelect(chatId); //This is for Home component
    setSelectedChat(chatId); //This is for the border style
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (chats.length === 0) {
    return <div>No chats yet</div>;
  }

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          const chatId = chat[0];
          const chatData = chat[1];
          const lastMessage = chatData.lastMessage;
          const isCurrentUserMessage =
            lastMessage?.senderId === currentUser.uid;
          const isSelected = selectedChat === chatId;

          return (
            <div
              className={`userChat ${isSelected ? "selected" : ""}`}
              key={chatId}
              onClick={() => handleSelect(chatId, chatData.userInfo)}
            >
              <img src={chatData.userInfo.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chatData.userInfo.displayName}</span>
                <p>
                  {isCurrentUserMessage && <i>You: </i>}
                  {lastMessage?.text ? (
                    lastMessage.text.length > 30 ? (
                      lastMessage.text.substring(0, 40) + "..."
                    ) : (
                      lastMessage.text
                    )
                  ) : (
                    <i>Image</i>
                  )}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Chats;
