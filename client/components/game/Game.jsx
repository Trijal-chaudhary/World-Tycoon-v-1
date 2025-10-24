import React, { use, useEffect, useState } from "react";
import "./Game.css";
import {
  buyTicket,
  dieRolled,
  lobbyDetails,
  ticketCheck,
  YourDetail,
} from "../../src/services/SignUp";
import socket from "../../src/services/socket";
import Bye from "./gameTicket/Bye";
import Owned from "./ownedMessage/Owned";
const Game = () => {
  // let owned = true;
  const [right, setRight] = useState([]);
  const [left, setLeft] = useState([]);
  const [top, setTop] = useState([]);
  const [bottom, setBottom] = useState([]);
  const [random, setRandom] = useState();
  const [gameData, setGameData] = useState();
  const [currenPlayer, setCurrentPlayer] = useState();
  const [yourData, setYourData] = useState();
  const [ticketData, setTicketData] = useState();
  const [ticketOwned, setTicketOwned] = useState();
  const [bankMoney, setBankMoney] = useState();
  const [ownedData, setOwnedData] = useState(null);
  // const [yourDetail, setYourDetail] = useState();
  // const [player, setPlayer] = useState();
  //----------------------------------------------------------------
  const [currentPositions, setCurrentPositions] = useState({});
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

  const movePlayer = (steps, player) => {
    const delay = 400;
    const boardSize = boardPositions.length;

    //----Player 1-------------------
    for (let i = 1; i <= steps; i++) {
      setTimeout(() => {
        setCurrentPositions((prevPositions) => {
          if (!prevPositions[player]) return prevPositions; // safety check

          return {
            ...prevPositions,
            [player]: {
              ...prevPositions[player],
              position: (prevPositions[player].position + 1) % boardSize,
            },
          };
        });
      }, i * delay);
    }
  };
  const playerStyle1 = {
    bottom:
      boardPositions[currentPositions?.player1?.position]?.bottom || "14%",
    right: boardPositions[currentPositions?.player1?.position]?.right || "4%",
  };
  const playerStyle2 = {
    bottom:
      boardPositions[currentPositions?.player2?.position]?.bottom || "14%",
    right: boardPositions[currentPositions?.player2?.position]?.right || "4%",
  };
  const playerStyle3 = {
    bottom:
      boardPositions[currentPositions?.player3?.position]?.bottom || "14%",
    right: boardPositions[currentPositions?.player3?.position]?.right || "4%",
  };
  const playerStyle4 = {
    bottom:
      boardPositions[currentPositions?.player4?.position]?.bottom || "14%",
    right: boardPositions[currentPositions?.player4?.position]?.right || "4%",
  };
  const roleTheDice = async () => {
    const yourDetail = await YourDetail();
    // console.log(yourDetail);
    const randomNumber = Math.floor(Math.random() * 12) + 1;
    let player = "";
    if (yourDetail.userDetail._id === currentPositions.player1.id) {
      // setPlayer('player1')
      player = "player1";
      // movePlayer(randomNumber, "player1");
    } else if (yourDetail.userDetail._id === currentPositions.player2.id) {
      // setPlayer('player2')
      player = "player2";
      // movePlayer(randomNumber, "player2");
    } else if (yourDetail.userDetail._id === currentPositions.player3.id) {
      // setPlayer('player3')
      player = "player3";
      // movePlayer(randomNumber, "player3");
    } else if (yourDetail.userDetail._id === currentPositions.player4.id) {
      // setPlayer('player4')
      player = "player4";
      // movePlayer(randomNumber, "player4");
    } else {
      alert("Who Are You");
    }
    await dieRolled(randomNumber);
    setRandom(randomNumber);
    // currentPositions[player].outCome = randomNumber;
    // console.log(currentPositions[player].position);
    socket.emit("PLAYER_MOVED", {
      outcome: randomNumber,
      player: player,
      code: yourDetail.code,
    });
    // socket.emit("WHO_NEXT", { code: yourDetail.code, player: player });
    socket.emit("POSITION_CHANGE", {
      position: currentPositions[player].position,
      code: yourDetail.code,
      player: player,
    });
    const isOwned = await ticketCheck({ player: player });
    // setTicketOwned(isOwned.message === "noOwner");
    // console.log(isOwned.message === "noOwner");
    if (isOwned.message === "noOwner") {
      localStorage.setItem("ticket", JSON.stringify(true));
      setTicketOwned(true);
    } else {
      localStorage.setItem("ticket", JSON.stringify(false));
      setTicketOwned(false);
      // alert("owned");
      setOwnedData(isOwned);
      socket.emit("WHO_NEXT", { code: yourData.code, player: currenPlayer });
      socket.emit("MY_MONEY", { player: currenPlayer, code: yourData.code });
    }
  };
  //---------------------------------------------------------
  useEffect(() => {
    setTicketData(JSON.parse(localStorage.getItem("ticketData")));
    setTicketOwned(JSON.parse(localStorage.getItem("ticket")));
    lobbyDetails().then((data) => {
      setRight(data.theme.slice(1, 9));
      setLeft(data.theme.slice(19, 27));
      setTop(data.theme.slice(10, 18));
      setBottom(data.theme.slice(28, 36));

      //----Current Position-----
      // console.log(data.positions);
      setGameData(data);
      setCurrentPositions(data.positions);
      setCurrentPlayer(`player${data.current + 1}`);
      const currPos = data.positions[currenPlayer]?.position;
      const tick = data.theme.find((item) => item.id === currPos + 1);
      // setTicketData(tick);
      // console.log(JSON.parse(localStorage.getItem("ticketData")));
    });
  }, []);
  useEffect(() => {
    YourDetail().then((you) => {
      setYourData(you);
      if (you && you.userDetail) {
        socket.emit("SOMEONE_JOINS", { code: you.code });
      }
    });
    socket.on("NEXT_IS", (data) => {
      setCurrentPlayer(`player${data.player + 1}`);
      // console.log(data.position);
      // console.log(data.player + 1);
      setTicketOwned(false);
    });
    socket.on("YOUR_MONEY", (data) => {
      // setCurrentPositions(data.position);
      setCurrentPositions((prev) => {
        const newState = { ...prev }; // Copy the *current* state (mid-animation)

        // Loop through the new data from the backend
        for (const playerKey in data.position) {
          if (newState[playerKey]) {
            // ONLY update the money field, leave 'position' alone.
            newState[playerKey].money = data.position[playerKey].money;
          }
        }
        return newState; // Return the merged state
      });
      setBankMoney(data.bankMoney);
    });
    socket.on("TICKET_INFO", (data) => {
      // console.log(data.ticketInfo);
      setTicketData(data.ticketInfo);
      localStorage.setItem("ticketData", JSON.stringify(data.ticketInfo));
    });
    socket.on("I_MOVED", (data) => {
      // console.log("I_MOVED received:", data);
      movePlayer(data.outcome, data.player);
      // setRandom(data.outcome);
      // currentPositions[data.player].outCome = data.outcome;
      // setCurrentPositions((prev) => ({
      //   ...prev,
      //   [data.player]: {
      //     ...prev[data.player],
      //     outCome: data.outcome,
      //   },
      // }));
    });

    return () => socket.off("I_MOVED");
  }, []);
  const Buy = async () => {
    const lobby = await lobbyDetails();
    if (
      currentPositions[currenPlayer].position ===
      lobby.positions[currenPlayer].position
    ) {
      socket.emit("WHO_NEXT", { code: yourData.code, player: currenPlayer });
      await buyTicket({ player: currenPlayer });
      localStorage.setItem("ticket", JSON.stringify(false));
      setTicketOwned(false);
      socket.emit("MY_MONEY", { player: currenPlayer, code: yourData.code });
    } else {
      alert("Bhai Pehle Pahuch Toh Jane Do");
    }
  };
  const OK = () => {
    setOwnedData(null);
  };
  return (
    <div className="game-interface-container">
      <img
        src="../../src/assets/logo.png"
        alt="World Tycoon Logo"
        className="game-logo"
      />

      <div className="All-players-info">
        <p
          className={
            yourData?.userDetail?._id === currentPositions?.player1?.id
              ? "gold"
              : ""
          }
          id={
            currentPositions?.[currenPlayer]?.id === gameData?.host?._id
              ? "curr"
              : "comm"
          }
        >
          {`${gameData?.host?.userName} ${currentPositions?.player1?.outCome} `}
          :
        </p>
        {gameData?.players?.map((ele, idx) => (
          <>
            <p
              className={yourData?.userDetail?._id === ele._id ? "gold" : ""}
              id={
                currentPositions?.[currenPlayer]?.id === ele?._id
                  ? "curr"
                  : "comm"
              }
            >
              {`${ele?.userName} ${
                currentPositions?.[`player${idx + 2}`]?.outCome ?? ""
              }`}
              :
            </p>
          </>
        ))}
      </div>

      <div className="Bank-Info">
        <p>BANK</p>
        <h3>${bankMoney ?? ""}</h3>
        <p>Tickets Left: 24</p>
      </div>

      <div className="Players-Info">
        <p>Harsh</p>
        {Object.keys(currentPositions).map((playerKey) => {
          const player = currentPositions[playerKey];
          return player.id === yourData?.userDetail?._id ? (
            <h2 key={player.id}>${player.money}</h2>
          ) : null;
        })}
      </div>
      {ticketOwned &&
      currentPositions?.[currenPlayer]?.id === yourData?.userDetail?._id ? (
        <>
          <div className="gameTicket">
            <Bye ticketInfo={ticketData} Buy={Buy} />
          </div>
        </>
      ) : (
        ""
      )}

      <div className="randomNumber">
        <h2>{random ? random : ""}</h2>
      </div>
      {!ticketOwned &&
      currentPositions?.[currenPlayer]?.id === yourData?.userDetail?._id ? (
        <>
          <button className="die" onClick={roleTheDice}>
            DICE
          </button>
        </>
      ) : (
        ""
      )}
      {ownedData ? (
        <>
          <div className="owned">
            <Owned data={ownedData} OK={OK} />
          </div>
        </>
      ) : (
        ""
      )}

      <div className="game-board">
        <div className="player1 p-red" id="player1" style={playerStyle1}></div>
        {currentPositions.player2 ? (
          <div
            className="player1 p-green"
            id="player2"
            style={playerStyle2}
          ></div>
        ) : (
          ""
        )}
        {currentPositions.player3 ? (
          <div
            className="player1 p-blue"
            id="player3"
            style={playerStyle3}
          ></div>
        ) : (
          ""
        )}
        {currentPositions.player4 ? (
          <div
            className="player1 p-yellow"
            id="player4"
            style={playerStyle4}
          ></div>
        ) : (
          ""
        )}

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
