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
        const message = messages[index - 1];
        const currentMsgDate = m.date;
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const showDate =
          index === 0 ||
          !isSameDay(
            new Date(currentMsgDate.seconds * 1000),
            new Date(message.date.seconds * 1000)
          );

        const showYear =
          index === 0 ||
          new Date(currentMsgDate.seconds * 1000).getFullYear() !==
            new Date(message.date.seconds * 1000).getFullYear();

        return (
          <div key={m.id}>
            {showDate && <div className="line"></div>}
            {showDate && (
              <div className="date">
                {showYear && (
                  <div className="date">
                    {" "}
                    {new Date(currentMsgDate.seconds * 1000).getFullYear()}
                  </div>
                )}
                {isSameDay(new Date(currentMsgDate.seconds * 1000), today) ? (
                  <span>Today</span>
                ) : isSameDay(
                    new Date(currentMsgDate.seconds * 1000),
                    yesterday
                  ) ? (
                  <span>Yesterday</span>
                ) : (
                  <span>
                    {new Date(currentMsgDate.seconds * 1000).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                      }
                    )}
                  </span>
                )}
              </div>
            )}
            <Message message={m} />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
