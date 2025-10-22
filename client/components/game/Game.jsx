import React, { use, useEffect, useState } from "react";
import "./Game.css";
import { lobbyDetails, YourDetail } from "../../src/services/SignUp";
import socket from "../../src/services/socket";
const Game = () => {
  const [right, setRight] = useState([]);
  const [left, setLeft] = useState([]);
  const [top, setTop] = useState([]);
  const [bottom, setBottom] = useState([]);

  //----------------------------------------------------------------
  const [currentPositions, setCurrentPosition] = useState([]);
  // setRight();
  const boardPositions = [
    { right: "2%", bottom: "14%" },
    { right: "2%", bottom: "21.5%" },
    { right: "2%", bottom: "29%" },
    { right: "2%", bottom: "36.5%" },
    { right: "2%", bottom: "44%" },
    { right: "2%", bottom: "51.5%" },
    { right: "2%", bottom: "59%" },
    { right: "2%", bottom: "66.5%" },
    { right: "2%", bottom: "74%" },
    { right: "2%", bottom: "94%" },
    { right: "22.3%", bottom: "94%" },
    { right: "30%", bottom: "94%" },
    { right: "37.5%", bottom: "94%" },
    { right: "45%", bottom: "94%" },
    { right: "52.5%", bottom: "94%" },
    { right: "60%", bottom: "94%" },
    { right: "67.5%", bottom: "94%" },
    { right: "75%", bottom: "94%" },
    { right: "81%", bottom: "94%" },
    { right: "81%", bottom: "75%" },
    { right: "81%", bottom: "66.5%" },
    { right: "81%", bottom: "59%" },
    { right: "81%", bottom: "51.5%" },
    { right: "81%", bottom: "44%" },
    { right: "81%", bottom: "36.5%" },
    { right: "81%", bottom: "29%" },
    { right: "81%", bottom: "22%" },
    { right: "81%", bottom: "14%" },
    { right: "75%", bottom: "14%" },
    { right: "67.5%", bottom: "14%" },
    { right: "60%", bottom: "14%" },
    { right: "52.5%", bottom: "14%" },
    { right: "45%", bottom: "14%" },
    { right: "37.5%", bottom: "14%" },
    { right: "30%", bottom: "14%" },
    { right: "22.5%", bottom: "14%" },
  ];

  const movePlayer = (steps) => {
    const delay = 400;
    const boardSize = boardPositions.length;

    for (let i = 1; i <= steps; i++) {
      setTimeout(() => {
        setCurrentPosition((prevPosition) => {
          return (prevPosition + 1) % boardSize;
        });
      }, i * delay);
    }
  };
  const playerStyle1 = {
    bottom: boardPositions[currentPositions]?.bottom || "10%",
    right: boardPositions[currentPositions]?.right || "3%",
  };
  const playerStyle2 = {
    bottom: "14%",
    right: "4%",
  };
  const playerStyle3 = {
    bottom: "14%",
    right: "6%",
  };
  const playerStyle4 = {
    bottom: "14%",
    right: "8%",
  };
  const roleTheDice = async () => {
    const yourDetail = await YourDetail();
    console.log(yourDetail);
    movePlayer(10);
  };
  //---------------------------------------------------------
  useEffect(() => {
    lobbyDetails().then((data) => {
      setRight(data.theme.slice(1, 9));
      setLeft(data.theme.slice(19, 27));
      setTop(data.theme.slice(10, 18));
      setBottom(data.theme.slice(28, 36));
      // console.log(data.theme.slice(1, 9));
      // socket.emit("POSITIONS", { code: data.code });
    });
  }, []);
  return (
    <div className="game-interface-container">
      <img
        src="../../src/assets/logo.png"
        alt="World Tycoon Logo"
        className="game-logo"
      />

      <div className="All-players-info">
        <p>Player 1:</p>
        <p>Player 2:</p>
        <p>Player 3:</p>
        <p>Player 4:</p>
      </div>

      <div className="Bank-Info">
        <p>BANK</p>
        <h3>$500,000</h3>
        <p>Tickets Left: 24</p>
      </div>

      <div className="Players-Info">
        <p>Harsh</p>
        <h2>$200,000</h2>
      </div>
      <button className="die" onClick={roleTheDice}>
        DICE
      </button>
      <div className="game-board">
        <div className="player1 p-red" id="player1" style={playerStyle1}></div>
        <div
          className="player1 p-green"
          id="player2"
          style={playerStyle2}
        ></div>
        <div className="player1 p-blue" id="player3" style={playerStyle3}></div>
        <div
          className="player1 p-yellow"
          id="player4"
          style={playerStyle4}
        ></div>
        <div className="rightSide">
          <div className="startPoint">
            <span class="dollar-cutout">^</span>
            <span class="text-pass">As you pass</span>
            <span class="text-collect">Collect $1500</span>
            <span class="text-start">Start</span>
          </div>
          {right.map((ele) => (
            <>
              <div className={`leftCards ${ele.Color}`}>
                <h4 className="CountryName">{ele.Name}</h4>

                <div className="flag-Container">
                  <img
                    src={`../../src/assets/flags/${ele.flag}`}
                    alt="Flag of Australia"
                  />
                  <h4>${ele.price}</h4>
                </div>
                <div className="themeImage">
                  <img
                    src={`../../src/assets/landmark/${ele.landMark}`}
                    alt="Sydney Opera House"
                  />
                </div>
              </div>
            </>
          ))}
          <div className="resort">
            <h4>RESORT</h4>
            <img src="../../src/assets/landmark/resort.jpg" alt="resort" />
          </div>
        </div>
        <div className="topSide">
          {top.map((ele) => (
            <>
              <div className={`topCards ${ele.Color}`}>
                <h4 className="CountryName-top">{ele.Name}</h4>
                <div className="themeImage-top">
                  <img
                    src={`../../src/assets/landmark/${ele.landMark}`}
                    alt="Sydney Opera House"
                  />
                </div>

                <div className="flag-Container-top">
                  <img
                    src={`../../src/assets/flags/${ele.flag}`}
                    alt="Flag of Australia"
                  />
                  <h4>$3300</h4>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="leftSide">
          <div className="partyHouse">
            <h4>PARTY HOUSE</h4>
            <img src="../../src/assets/landmark/party.jpg" alt="resort" />
          </div>
          {left.map((ele) => (
            <>
              <div className={`leftCards ${ele.Color}`}>
                <h4 className="CountryName">{ele.Name}</h4>

                <div className="flag-Container">
                  <img
                    src={`../../src/assets/flags/${ele.flag}`}
                    alt="Flag of Australia"
                  />
                  <h4>${ele.price}</h4>
                </div>
                <div className="themeImage">
                  <img
                    src={`../../src/assets/landmark/${ele.landMark}`}
                    alt="Sydney Opera House"
                  />
                </div>
              </div>
            </>
          ))}
          <div className="partyHouse jail">
            <h4>JAIL</h4>
            <img src="../../src/assets/landmark/jail.jpg" alt="resort" />
          </div>
        </div>
        <div className="bottomSide">
          {bottom.map((ele) => (
            <>
              <div className={`topCards ${ele.Color}`}>
                <div className="themeImage-top">
                  <img
                    src={`../../src/assets/landmark/${ele.landMark}`}
                    alt="Sydney Opera House"
                  />
                </div>
                <h4 className="CountryName-top">{ele.Name}</h4>

                <div className="flag-Container-top">
                  <img
                    src={`../../src/assets/flags/${ele.flag}`}
                    alt="Flag of Australia"
                  />
                  <h4>${ele.price}</h4>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
