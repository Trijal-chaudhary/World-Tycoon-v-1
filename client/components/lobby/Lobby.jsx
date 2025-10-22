import React, { useEffect, useState } from "react";
import "./Lobby.css";
import {
  gameStarted,
  leaveLobby,
  lobbyDetails,
  YourDetail,
} from "../../src/services/SignUp";
import socket from "../../src/services/socket";
import { useNavigate } from "react-router-dom";
const Lobby = () => {
  const navigate = useNavigate();
  const [hostDetails, setHostDetails] = useState({});
  const [playerDetails, setPlayerDetails] = useState([]);
  const [gameCode, setGameCode] = useState("");
  const [yourDetail, setYourDetail] = useState({});
  //<--leving the lobby bye bye
  const leavingLobby = async () => {
    const areYouHost = await leaveLobby(yourDetail._id);
    if (areYouHost.host) {
      alert("You are the host how can you leave the middle of game");
    } else {
      socket.emit("SOMEONE_JOINS", { code: gameCode });
      navigate("/");
    }
    console.log(areYouHost);
  };
  //-------------------------------------
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
          setYourDetail(you.userDetail);
          socket.emit("SOMEONE_JOINS", { code: Detail.code });
        }
        if (you) {
          socket.emit("MY_DETAILS", { you: you.userDetail });
        }
      });
    });

    return () => {
      socket.off("NEW_PLAYER_JOINED");
    };
  }, []);
  const startTheGame = async () => {
    await gameStarted();
    navigate("/game");
  };
  return (
    <div className="game-lobby-background">
      <div className="game-lobby-container">
        <h3 className="your-name-display">{yourDetail.name}</h3>
        <header className="lobby-header">
          <img
            src="../../src/assets/logo.png"
            alt="World Tycoon Logo"
            className="game-logo-lobby"
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
        <button className="leave-lobby-button" onClick={leavingLobby}>
          Leave Lobby
        </button>
        {hostDetails._id !== yourDetail._id ? (
          ""
        ) : (
          <button className="start-game-button" onClick={startTheGame}>
            Start Game
          </button>
        )}
      </div>
    </div>
  );
};

export default Lobby;
