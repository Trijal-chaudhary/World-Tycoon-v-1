import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  return (
    <div className="OuterConte">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg"
        viewBox="0 0 640 640"
        onClick={() => navigate("/")}
      >
        <path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
      </svg>
      <div class="about-container">
        <h1>About World Tycoon</h1>

        <p>
          Welcome to <strong>World Tycoon</strong>, the ultimate strategic board
          game where the world is your property, and power is measured in
          assets. Step away from the small board and enter an immersive,
          real-time environment built for up to four ambitious players. This is
          where business acumen meets global conquest.
        </p>

        <h2>Your Throne Awaits</h2>
        <p>
          Forget simple rent collecting; you are a head of state, a titan of
          industry, or a monarch of commerce. Your mission is clear:{" "}
          <strong>dominate the global market.</strong>
        </p>

        <ul>
          <li>
            <strong>Acquire Nations:</strong> Travel the board, landing on
            countries represented by unique property tiles. Use your strategic
            vision to purchase land, develop assets, and build an unstoppable
            financial empire.
          </li>
          <li>
            <strong>Real-Time Strategy:</strong> Play with friends in real-time.
            The game flow is managed by a turn-based system, with a dice
            determining your fate and a global bank monitoring your
            transactions.
          </li>
          <li>
            <strong>Liquidate Assets:</strong> Need fast cash? You can sell your
            properties back to the bank to finance your next major acquisition.
            But choose wisely, as you lose the property's income stream.
          </li>
        </ul>

        <h2>Game Mechanics</h2>
        <p>
          World Tycoon uses a streamlined, persistent state management system to
          ensure every transaction and every move is instantly reflected across
          all connected players.
        </p>

        <div class="mechanics-grid">
          <div class="mechanic-card">
            <h3>The Dice</h3>
            <p>
              Determines your movement across the global map (board positions).
              Calculate risk and reward based on your potential landing spot.
            </p>
          </div>
          <div class="mechanic-card">
            <h3>Ticket Status</h3>
            <p>
              Tracks which player owns which country property. Determine if you
              must pay rent or if you can acquire an unowned asset.
            </p>
          </div>
          <div class="mechanic-card">
            <h3>Real-Time Turns</h3>
            <p>
              The server dictates whose turn it is next. Use your time wisely,
              as your opponents are moving, even when it's not your turn.
            </p>
          </div>
        </div>

        <p class="call-to-action">
          World Tycoon is a game of high finance, high stakes, and high
          strategy. Will you forge an empire, or will your economy crumble?
        </p>
      </div>
    </div>
  );
};

export default About;
