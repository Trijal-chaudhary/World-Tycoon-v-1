import React from "react";
import "./Help.css";
import { useNavigate } from "react-router-dom";
const Help = () => {
  const navigate = useNavigate();
  return (
    <div className="Outer5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg"
        viewBox="0 0 640 640"
        onClick={() => navigate("/")}
      >
        <path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
      </svg>
      <div class="help-container">
        <h1 class="title">How to Play World Tycoon</h1>

        <p>
          Welcome, Tycoon! This guide will explain everything you need to know
          to build your global empire and crush your rivals. Let's begin.
        </p>

        <h2>Getting Started</h2>
        <ul className="List25">
          <li>
            <strong>Sign Up & Log In:</strong> First, you'll need to create an
            account. Once you log in, you'll be in the Home, your command
            center.
          </li>
          <li>
            <strong>Create Game:</strong> As the host, click "Create Game." You
            will get to select a theme for your match.
          </li>
          <li>
            <strong>The Game Code:</strong> The lobby will show you a unique
            Game Code. Share this code with your friends so they can join your
            match. You can play with up to 4 players.
          </li>
          <li>
            <strong>Join Game:</strong> If your friend is hosting, click "Join
            Game" from the main menu and enter their code.
          </li>
          <li>
            <strong>Start Game:</strong> Once all players are in the lobby, the
            host can click "Start Game" to begin!
          </li>
        </ul>

        <h2>How to Play Your Turn</h2>
        <p>
          The goal is to hold the most money — keep building your fortune until
          an opponent goes bankrupt.
        </p>
        <ul>
          <li>
            <strong>Roll the Dice:</strong> When it's your turn, the "DICE"
            button will appear. Click it to roll a 12-sided die. Your token will
            move automatically.
          </li>
          <li>
            <strong>Landing on Unowned Property:</strong> If you land on a
            property no one owns, a window will pop up. You can choose to{" "}
            <strong>Buy</strong> it or <strong>Pass</strong>. If you buy, the
            cost is deducted from your cash.
          </li>
          <li>
            <strong>Landing on Owned Property:</strong> If you land on a
            property owned by an opponent, you must pay them the required rent!
            The amount is deducted from your money and given to the owner
            automatically.
          </li>
          <li>
            <strong>Landing on Your Property:</strong> You're safe! Even better,
            if you land on your own property, you'll get the option to{" "}
            <strong>Upgrade</strong> it by building houses or a hotel, which
            massively increases its rent.
          </li>
        </ul>

        <h2>Advanced Strategy</h2>
        <ul>
          <li>
            <strong>Color Sets:</strong> This is the key to winning. If you own{" "}
            <strong>three or more properties of the same color</strong>, the
            rent on ALL of those properties is <strong>DOUBLED</strong>.
          </li>
          <li>
            <strong>Special Pairs:</strong> This bonus also applies to special
            pairs! Owning both 'Roadways' and 'Waterways' doubles the rent for
            both. The same applies to owning 'Railways' and 'Airways', or
            'Petroleum' and 'Satellite'.
          </li>
          <li>
            <strong>Selling Property:</strong> Need cash? You can sell your
            properties back to the Bank at any time for 50% of their original
            price. Just click "Your Tickets" to sell.
          </li>
        </ul>
        <h2>Special Tiles on the Board</h2>
        <p>Not every tile is a property. Watch out for these special spaces:</p>
        <ul>
          <li>
            <strong>Start:</strong> Every time you land on START, you collect a
            $1500 salary from the Bank.
          </li>
          <li>
            <strong>Jail:</strong> You're in trouble! Pay a $500 fine to the
            Bank.
          </li>
          <li>
            <strong>Party House:</strong> You host a massive party. Collect $200
            from every other player.
          </li>
          <li>
            <strong>Resort:</strong> Time to relax, but it costs you. Pay $50 to
            every other player.
          </li>
          <li>
            <strong>Duty / Custom:</strong> A simple $200 tax paid to the Bank.
          </li>
          <li>
            <strong>Chance & UNO:</strong> Landing here triggers a random event
            based on your dice roll. It could be good ("Bank error in your
            favor, collect $2000") or bad ("Pay a $500 speeding ticket"). Be
            ready for anything!
          </li>
        </ul>
        <h2>How to Win</h2>
        <ul>
          <li>
            <strong>Bankruptcy:</strong> The game is ruthless. If your cash
            falls to <strong>negative $5,000 or lower</strong>, you are declared{" "}
            <strong>BANKRUPT</strong>, the game concludes and your final
            standings appear on the leaderboard.
          </li>
          <li>
            <strong>Wealth Reigns Supreme:</strong> The game ends when a player
            goes bankrupt — the tycoon with the most money is crowned the
            ultimate World Tycoon!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
