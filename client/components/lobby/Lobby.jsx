import React, { useEffect, useState } from "react";
import "./Lobby.css";
import { lobbyDetails, YourDetail } from "../../src/services/SignUp";
import socket from "../../src/services/socket";
const Lobby = () => {
  const [hostDetails, setHostDetails] = useState({});
  const [playerDetails, setPlayerDetails] = useState([]);
  const [gameCode, setGameCode] = useState("");
  const [yourDetail, setYourDetail] = useState({});
  useEffect(() => {
    const handleLobbyUpdate = (data) => {
      const lobby = data.lobbyDetail;
      if (lobby) {
        setHostDetails(lobby.host);
        setPlayerDetails(lobby.players || []);
        setGameCode(lobby.code);
        // console.log(data);
      }
    };
    const handelYourDetails = (data) => {
      if (data) {
        setYourDetail(data.yourDetails);
      }
    };
    socket.on("NEW_PLAYER_JOINED", handleLobbyUpdate);
    socket.on("YOUR_DETAILS", handelYourDetails);

    lobbyDetails().then((Detail) => {
      YourDetail().then((you) => {
        if (Detail) {
          setHostDetails(Detail.host);
          setPlayerDetails(Detail.players || []);
          setGameCode(Detail.code);
          setYourDetail(you);
          socket.emit("SOMEONE_JOINS", { code: Detail.code });
        }
        if (you) {
          socket.emit("MY_DETAILS", { you: you });
        }
      });
    });

    return () => {
      socket.off("NEW_PLAYER_JOINED");
    };
  }, []);
  return (
    <div className="game-lobby-background">
      <div className="game-lobby-container">
        <h3 className="your-name-display">{yourDetail.name}</h3>
        <header className="lobby-header">
          <img
            src="../../src/assets/logo.png"
            alt="World Tycoon Logo"
            className="game-logo"
          />
        </header>

        <main className="player-grid">
          <div>
            <img src="/assets/default-avatar.png" alt="Avatar" />
            <p>
              {hostDetails._id === yourDetail._id ? "YOU" : hostDetails.name}{" "}
              (Host)
            </p>
          </div>

          {/* Player 2 */}

          {playerDetails.map((player) => (
            <div>
              <img src="/assets/default-avatar.png" alt="Avatar" />
              <p>{player._id === yourDetail._id ? "YOU" : player.name}</p>
            </div>
          ))}
        </main>
        <h2>Game Code: {gameCode}</h2>
        <button className="leave-lobby-button">Leave Lobby</button>
        {hostDetails._id !== yourDetail._id ? (
          ""
        ) : (
          <button className="start-game-button">Start Game</button>
        )}
      </div>
    </div>
  );
};

export default Lobby;
