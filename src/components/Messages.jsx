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

  const isSameYear = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear();
  };

  const isToday = (date1, date2) => {
    return date1.getDate() === date2.getDate();
  };

  const isYesterday = (date1, date2) => {
    // Obtener las fechas de ayer y hoy
    const yesterday = new Date(date2);
    yesterday.setDate(yesterday.getDate() - 1);

    // Compara solo el año, mes y día para determinar si es ayer
    return (
      date1.getFullYear() === yesterday.getFullYear() &&
      date1.getMonth() === yesterday.getMonth() &&
      date1.getDate() === yesterday.getDate()
    );
  };

  return (
    <div className="messages">
      {messages.map((m, index) => {
        // Check if it's the first message or if the current message is from a different day
        if (index === 0) {
          index = 1;
        }

        const message = messages[index - 1];
        const seconds = message.date.seconds;

        const seconds2 = m.date.seconds;

        const currentMsgDate = new Date(seconds2 * 1000);
        const previousMsgDate = new Date(seconds * 1000);

        const showDate =
          index === 0 ||
          (currentMsgDate && !isSameDay(previousMsgDate, currentMsgDate));
        const showYear =
          index === 0 ||
          (currentMsgDate && !isSameYear(previousMsgDate, currentMsgDate));
        const isToday =
          index === 0 ||
          (currentMsgDate && isSameDay(previousMsgDate, currentMsgDate));
        const isYesterdayDate =
          index === 0 ||
          (currentMsgDate && isYesterday(previousMsgDate, currentMsgDate));

        return (
          <div key={m.id}>
            {showDate && <div className="line"></div>}
            {showYear && (
              <div className="date">{currentMsgDate.getFullYear()}</div>
            )}
            {showDate && (
              <div className="date">
                {new Date(currentMsgDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                })}
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
