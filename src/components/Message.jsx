import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { format, differenceInSeconds } from "date-fns";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [displayTime, setDisplayTime] = useState("");

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const currentTime = new Date();
    const messageTime = message.date.toDate();
    const secondsDifference = differenceInSeconds(currentTime, messageTime);

    if (secondsDifference < 60) {
      // Mostrar "just now" si han pasado menos de 1 minuto
      setDisplayTime("just now");
    } else {
      // Mostrar la hora formateada para diferencias mayores a 1 minuto
      setDisplayTime(format(messageTime, "HH:mm"));
    }

    // Actualizar el tiempo cada segundo
    const timer = setInterval(() => {
      const updatedSecondsDifference = differenceInSeconds(
        new Date(),
        messageTime
      );

      if (updatedSecondsDifference < 60) {
        setDisplayTime("just now");
      } else {
        setDisplayTime(format(messageTime, "HH:mm"));
      }
    }, 1000);

    return () => {
      // Limpiar el temporizador al desmontar el componente
      clearInterval(timer);
    };
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{displayTime}</span>
      </div>
      <div className="messageContent">
        {message.text !== "" && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
