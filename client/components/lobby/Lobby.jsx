import React, { useEffect, useState } from "react";
import "./Lobby.css";
import { lobbyDetails } from "../../src/services/SignUp";
const Lobby = () => {
  const [hostDetails, setHostDetails] = useState();
  const [playerDetails, setPlayerDetails] = useState([]);
  const [gameCode, setGameCode] = useState("");
  useEffect(() => {
    lobbyDetails().then((Detail) => {
      setHostDetails(Detail.host);
      setPlayerDetails(Detail.players);
      setGameCode(Detail.code);
      // console.log(hostDetails);
    });
  }, []);
  return (
    <div className="game-lobby-background">
      <div className="game-lobby-container">
        <header className="lobby-header">
          <img
            src="../../src/assets/logo.png"
            alt="World Tycoon Logo"
            className="game-logo"
          />
        </header>

        <main className="player-grid">
          {/* Player 1 */}
          <div>
            <img src="/assets/default-avatar.png" alt="Avatar" />
            <p>{hostDetails ? hostDetails.name : ""} (Host)</p>
          </div>

          {/* Player 2 */}

          {playerDetails.map((player) => (
            <div>
              <img src="/assets/default-avatar.png" alt="Avatar" />
              <p>{player.name}</p>
            </div>
          ))}
        </main>
        <h2>Game Code: {gameCode}</h2>
      </div>
    </div>
  );
};

export default Lobby;
