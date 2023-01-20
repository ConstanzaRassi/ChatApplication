import React from "react";
import profilePhoto from "../img/profile.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Coti Chat</span>
      <div className="user">
        <img src={profilePhoto} alt="" />
        <span>Coti Rassi</span>
        <button>Log Out</button>
      </div>
    </div>
  );
};

export default Navbar;
