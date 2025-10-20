import React, { useEffect } from "react";
import "./Lobby.css";
import { lobbyDetails } from "../../src/services/SignUp";
const Lobby = () => {
  useEffect(() => {
    lobbyDetails().then(() => {});
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
            <p>Harsh Vardhan Chaudhary</p>
          </div>

          {/* Player 2 */}
          <div>
            <img src="/assets/default-avatar.png" alt="Avatar" />
            <p>Waiting for Player...</p>
          </div>

          {/* Player 3 */}
          <div>
            <img src="/assets/default-avatar.png" alt="Avatar" />
            <p>Waiting for Player...</p>
          </div>

          {/* Player 4 */}
          <div>
            <img src="/assets/default-avatar.png" alt="Avatar" />
            <p>Waiting for Player...</p>
          </div>
        </main>
        <h2>Lobby Code: X2SD56</h2>
      </div>
    </div>
  );
};

export default Lobby;
