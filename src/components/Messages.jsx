import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  // Function to check if two dates are on the same day
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <div className="messages">
      {messages.map((m, index) => {
        // Check if it's the first message or if the current message is from a different day
        const showDate =
          index === 0 ||
          !isSameDay(
            new Date(messages[index - 1].timestamp),
            new Date(m.timestamp)
          );

        return (
          <div key={m.id}>
            {/* {showDate && (
              <span className="date">
                <span className="date">
                  {new Date(m.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </span>
              </span>
            )} */}
            <Message message={m} />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
