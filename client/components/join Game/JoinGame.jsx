import React, { useRef } from "react";
import "./JoinGame.css";
import { joinInGame } from "../../src/services/SignUp";
import { useNavigate } from "react-router-dom";
import socket from "../../src/services/socket";
const JoinGame = () => {
  const navigate = useNavigate();
  const codeRef = useRef();
  const codeSubmit = async (e) => {
    e.preventDefault();
    console.log(codeRef.current.value);
    const exist = await joinInGame(codeRef.current.value);
    console.log(exist.added);
    if (!exist.added) {
      alert("Invalid Game Code");
    } else {
      // socket.emit("SOMEONE_JOINS", { code: codeRef.current.value });
      navigate("/lobby");
    }
  };
  return (
    <div className="join-game-page-container">
      <div className="join-game-container">
        <form className="join-game-form" onSubmit={codeSubmit}>
          <input type="text" placeholder="Enter the Game Code" ref={codeRef} />
          <button type="submit">Join Game</button>
        </form>
      </div>
    </div>
  );
};

export default JoinGame;
