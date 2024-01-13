import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (username.trim() === "") {
      setSearchResults([]);
      return;
    } else {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const results = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const regex = new RegExp(username, "i"); // Ignore case
          if (regex.test(userData.displayName)) {
            results.push(userData);
          }
        });
        setSearchResults(results);
      } catch (err) {
        setErr(true);
      }
    }
  };

  useEffect(() => {
    handleSearch();
    return () => {
      if (username.trim() === "") {
        setSearchResults([]);
      }
    };
  }, [username]);

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSearchResultSelect = async (selectedUser) => {
    setUser(selectedUser);
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        console.log(combinedId);
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <div className="icon">
          <AiOutlineSearch />
        </div>
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>mal</span>}
      {searchResults.length > 0 && (
        <div className="searchResults">
          {searchResults.map((result) => (
            <div
              className="userChat"
              key={result.uid}
              onClick={() => handleSearchResultSelect(result)}
            >
              <img src={result.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{result.displayName}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
