import React from "react";
// import profilePhoto from "../img/profile.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <span className="logo">Coti Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <div className="logoutIcon" onClick={() => signOut(auth)}>
          <MdLogout />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
