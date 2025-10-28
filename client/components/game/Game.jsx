import React, { use, useEffect, useState } from "react";
import "./Game.css";
import {
  buyTicket,
  dieRolled,
  lobbyDetails,
  sell,
  ticketCheck,
  YourDetail,
} from "../../src/services/SignUp";
import socket from "../../src/services/socket";
import Bye from "./gameTicket/Bye";
import Owned from "./ownedMessage/Owned";
import TicketsOwned from "./ticketOwned/TicketsOwned";
import TicketInfo from "./ticketInfo/TicketInfo";
import ChanceAndUno from "./ChanceAndUno/ChanceAndUno";
import Result from "./LobbyAfterGame/Result";
import Sell from "./Sell/Sell";
import { useNavigate } from "react-router-dom";
const Game = () => {
  // let owned = true;
  const navigate = useNavigate();
  const [inProgress, setInProgress] = useState(false);
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
  const [yourTickets, setYourTickets] = useState();
  const [clickTicket, setClickTicket] = useState(null);
  const [chanceAndUno, setChanceAndUno] = useState(null);
  const [sortedPosition, setsortedPosition] = useState(null);
  const [sellTicket, setSellTicket] = useState(null);
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
  const boardPositionsPlayer2 = [
    { right: "3.5%", bottom: "12.5%" },
    { right: "3.5%", bottom: "21.5%" },
    { right: "3.5%", bottom: "29%" },
    { right: "3.5%", bottom: "36.5%" },
    { right: "3.5%", bottom: "44%" },
    { right: "3.5%", bottom: "51.5%" },
    { right: "3.5%", bottom: "59%" },
    { right: "3.5%", bottom: "66.5%" },
    { right: "3.5%", bottom: "74%" },
    { right: "3.5%", bottom: "92.5%" },
    { right: "22.3%", bottom: "92.5%" },
    { right: "30%", bottom: "92.5%" },
    { right: "37.5%", bottom: "92.5%" },
    { right: "45%", bottom: "92.5%" },
    { right: "52.5%", bottom: "92.5%" },
    { right: "60%", bottom: "92.5%" },
    { right: "67.5%", bottom: "92.5%" },
    { right: "75%", bottom: "92.5%" },
    { right: "82.5%", bottom: "92.5%" },
    { right: "82.5%", bottom: "75%" },
    { right: "82.5%", bottom: "66.5%" },
    { right: "82.5%", bottom: "59%" },
    { right: "82.5%", bottom: "51.5%" },
    { right: "82.5%", bottom: "44%" },
    { right: "82.5%", bottom: "36.5%" },
    { right: "82.5%", bottom: "29%" },
    { right: "82.5%", bottom: "22%" },
    { right: "82.5%", bottom: "12.5%" },
    { right: "75%", bottom: "12.5%" },
    { right: "67.5%", bottom: "12.5%" },
    { right: "60%", bottom: "12.5%" },
    { right: "52.5%", bottom: "12.5%" },
    { right: "45%", bottom: "12.5%" },
    { right: "37.5%", bottom: "12.5%" },
    { right: "30%", bottom: "12.5%" },
    { right: "22.5%", bottom: "12.5%" },
  ];
  const boardPositionsPlayer3 = [
    { right: "5%", bottom: "11%" },
    { right: "5%", bottom: "21.5%" },
    { right: "5%", bottom: "29%" },
    { right: "5%", bottom: "36.5%" },
    { right: "5%", bottom: "44%" },
    { right: "5%", bottom: "51.5%" },
    { right: "5%", bottom: "59%" },
    { right: "5%", bottom: "66.5%" },
    { right: "5%", bottom: "74%" },
    { right: "5%", bottom: "91%" },
    { right: "22.3%", bottom: "91%" },
    { right: "30%", bottom: "91%" },
    { right: "37.5%", bottom: "91%" },
    { right: "45%", bottom: "91%" },
    { right: "52.5%", bottom: "91%" },
    { right: "60%", bottom: "91%" },
    { right: "67.5%", bottom: "91%" },
    { right: "75%", bottom: "91%" },
    { right: "84%", bottom: "91%" },
    { right: "84%", bottom: "75%" },
    { right: "84%", bottom: "66.5%" },
    { right: "84%", bottom: "59%" },
    { right: "84%", bottom: "51.5%" },
    { right: "84%", bottom: "44%" },
    { right: "84%", bottom: "36.5%" },
    { right: "84%", bottom: "29%" },
    { right: "84%", bottom: "22%" },
    { right: "84%", bottom: "11%" },
    { right: "75%", bottom: "11%" },
    { right: "67.5%", bottom: "11%" },
    { right: "60%", bottom: "11%" },
    { right: "52.5%", bottom: "11%" },
    { right: "45%", bottom: "11%" },
    { right: "37.5%", bottom: "11%" },
    { right: "30%", bottom: "11%" },
    { right: "22.5%", bottom: "11%" },
  ];
  const boardPositionsPlayer4 = [
    { right: "6.5%", bottom: "9.5%" },
    { right: "6.5%", bottom: "21.5%" },
    { right: "6.5%", bottom: "29%" },
    { right: "6.5%", bottom: "36.5%" },
    { right: "6.5%", bottom: "44%" },
    { right: "6.5%", bottom: "51.5%" },
    { right: "6.5%", bottom: "59%" },
    { right: "6.5%", bottom: "66.5%" },
    { right: "6.5%", bottom: "74%" },
    { right: "6.5%", bottom: "89.5%" },
    { right: "22.3%", bottom: "89.5%" },
    { right: "30%", bottom: "89.5%" },
    { right: "37.5%", bottom: "89.5%" },
    { right: "45%", bottom: "89.5%" },
    { right: "52.5%", bottom: "89.5%" },
    { right: "60%", bottom: "89.5%" },
    { right: "67.5%", bottom: "89.5%" },
    { right: "75%", bottom: "89.5%" },
    { right: "85.5%", bottom: "89.5%" },
    { right: "85.5%", bottom: "75%" },
    { right: "85.5%", bottom: "66.5%" },
    { right: "85.5%", bottom: "59%" },
    { right: "85.5%", bottom: "51.5%" },
    { right: "85.5%", bottom: "44%" },
    { right: "85.5%", bottom: "36.5%" },
    { right: "85.5%", bottom: "29%" },
    { right: "85.5%", bottom: "22%" },
    { right: "85.5%", bottom: "9.5%" },
    { right: "75%", bottom: "9.5%" },
    { right: "67.5%", bottom: "9.5%" },
    { right: "60%", bottom: "9.5%" },
    { right: "52.5%", bottom: "9.5%" },
    { right: "45%", bottom: "9.5%" },
    { right: "37.5%", bottom: "9.5%" },
    { right: "30%", bottom: "9.5%" },
    { right: "22.5%", bottom: "9.5%" },
  ];
  const delay = 400;

  const movePlayer = (steps, player) => {
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
      boardPositionsPlayer2[currentPositions?.player2?.position]?.bottom ||
      "14%",
    right:
      boardPositionsPlayer2[currentPositions?.player2?.position]?.right || "4%",
  };
  const playerStyle3 = {
    bottom:
      boardPositionsPlayer3[currentPositions?.player3?.position]?.bottom ||
      "14%",
    right:
      boardPositionsPlayer3[currentPositions?.player3?.position]?.right || "4%",
  };
  const playerStyle4 = {
    bottom:
      boardPositionsPlayer4[currentPositions?.player4?.position]?.bottom ||
      "14%",
    right:
      boardPositionsPlayer4[currentPositions?.player4?.position]?.right || "4%",
  };
  const roleTheDice = async () => {
    const yourDetail = await YourDetail();
    const lobby = await lobbyDetails();
    if (
      currentPositions[currenPlayer].position !==
      lobby.positions[currenPlayer].position
    ) {
      setOwnedData(`Chance played. Relax, legend — even luck needs a break`);
      return;
    }
    setInProgress(true);

    // console.log(yourDetail);
    const randomNumber = Math.floor(Math.random() * 12) + 1;
    let player = "";
    if (yourDetail.userDetail._id === currentPositions.player1.id) {
      // setPlayer('player1'
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
    const afterDuration = randomNumber * delay;
    setTimeout(async () => {
      socket.emit("POSITION_CHANGE", {
        position: currentPositions[player].position,
        code: yourDetail.code,
        player: player,
      });
      const isOwned = await ticketCheck({
        player: player,
        outCome: randomNumber,
      });

      // setTicketOwned(isOwned.message === "noOwner");
      // console.log(isOwned.message === "noOwner");
      if (isOwned.message === "noOwner") {
        localStorage.setItem("ticket", JSON.stringify(true));
        setTicketOwned(true);
      } else if (isOwned.message === "youOwner") {
        // socket.emit("WHO_NEXT", {
        //   code: yourData.code,
        //   player: currenPlayer,
        //   // position: currentPositions,
        // });
        setOwnedData(
          `You are the proud owner here! Time to invest in a House or upgrade to a Hotel?`
        );
        localStorage.setItem("ticket", JSON.stringify(true));
        setTicketOwned(true);
        socket.emit("MY_MONEY", { player: currenPlayer, code: yourData.code });
        // alert("You Are the owner");
      } else if (isOwned.message === "yesOwner") {
        localStorage.setItem("ticket", JSON.stringify(false));
        setTicketOwned(false);
        // alert("owned");
        const data = `Ticket has been purchased by ${isOwned?.owner}. $${isOwned?.rent} has been
            deducted from your money.`;
        setOwnedData(data);
        socket.emit("WHO_NEXT", { code: yourData.code, player: currenPlayer });
        socket.emit("MY_MONEY", { player: currenPlayer, code: yourData.code });
      } else if (isOwned.message === "cantUpgrade") {
        socket.emit("WHO_NEXT", { code: yourData.code, player: currenPlayer });
        socket.emit("MY_MONEY", { player: currenPlayer, code: yourData.code });
        setOwnedData(
          "You already own this! There is nothing left to upgrade here, boss"
        );
      } else if (isOwned.message === "Hotel") {
        socket.emit("WHO_NEXT", { code: yourData.code, player: currenPlayer });
        socket.emit("MY_MONEY", { player: currenPlayer, code: yourData.code });
        setOwnedData(
          "This territory is already maxed out — no further upgrades allowed, commander!"
        );
      } else {
        socket.emit("WHO_NEXT", { code: yourData.code, player: currenPlayer });
        socket.emit("MY_MONEY", { player: currenPlayer, code: yourData.code });
        // alert(isOwned.message);
        setOwnedData(isOwned.message);
      }
      socket.emit("TRACK_MONEY", {
        code: yourData.code,
      });
    }, afterDuration);
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
      // const youAre =
      setBankMoney(data.Bank);
      //----Current Position-----
      // console.log(data.positions);
      // console.log(
      //   currentPositions[currenPlayer]?.position ===
      //     data?.positions[currenPlayer]?.position
      // );
      setInProgress(
        currentPositions[currenPlayer]?.position !==
          data?.positions[currenPlayer]?.position
      );
      setGameData(data);
      setCurrentPositions(data.positions);
      setCurrentPlayer(`player${data.current + 1}`);
      const currPos = data.positions[currenPlayer]?.position;
      const tick = data.theme.find((item) => item.id === currPos + 1);
      // setTicketData(tick);
      // console.log(JSON.parse(localStorage.getItem("ticketData")));
      // Object.keys(data.positions).forEach((playerKey) => {
      //   if (data.positions[playerKey].id === yourData.userDetail._id) {
      //     const red = data.theme.filter((ele) => ele.Color === "red");
      //     console.log(red, playerKey);
      //   }
      // });
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
      setInProgress(false);
    });
    socket.on("BANKRUPT", (data) => {
      localStorage.setItem("ticket", JSON.stringify(false));
      setTicketOwned(false);
      const alMess = `${data.player} has gone BANKRUPT!!`;
      setOwnedData(alMess);
      // alert(alMess);
      navigate("/result");
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
    socket.on("SOMEONE_BUYED", (data) => {
      setOwnedData(data.message);
    });
    socket.on("SOLED", (data) => {
      setOwnedData(data.message);
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
    socket.on("YOUR_TICKETS", (data) => {
      setYourTickets(data);
      console.log(data);
    });

    return () => socket.off("I_MOVED");
  }, []);
  useEffect(() => {
    if (yourData && gameData) {
      socket.emit("FETCHING_YOUR_TICKETS", {
        lobby: gameData,
        you: yourData,
      });
    }
  }, [yourData, gameData]);

  const clickedOnTicket = async (pos) => {
    if (pos === 30 || pos === 17 || pos === 5 || pos === 26) {
      setChanceAndUno(true);
    } else if (pos === 14 || pos === 22) {
      return;
    } else {
      const lobby = await lobbyDetails();
      const tic = lobby.theme.find((ele) => ele.id === pos);
      setClickTicket(tic);
    }

    // console.log(tic);
  };
  const ownedTicketClick = async (pos) => {
    const lobby = await lobbyDetails();
    const tic = lobby.theme.find((ele) => ele.id === pos);
    setSellTicket(tic);
  };
  const crossSell = () => {
    setSellTicket(null);
  };
  const SellTick = async (id) => {
    const res = await sell({ id: id });
    const updatedLobby = await lobbyDetails();
    socket.emit("FETCHING_YOUR_TICKETS", {
      lobby: updatedLobby,
      you: yourData,
    });
    // setOwnedData(res.message);
    socket.emit("SELL", {
      message: res.message,
      broadcast: res.broadcast,
      code: yourData.code,
    });
    setSellTicket(null);
    socket.emit("MY_MONEY", { player: currenPlayer, code: yourData.code });
  };
  const crossChance = () => {
    setChanceAndUno(null);
  };
  const cross = () => {
    setClickTicket(null);
  };
  const Buy = async () => {
    const lobby = await lobbyDetails();
    if (
      currentPositions[currenPlayer].position ===
      lobby.positions[currenPlayer].position
    ) {
      socket.emit("WHO_NEXT", { code: yourData.code, player: currenPlayer });
      const res = await buyTicket({ player: currenPlayer });
      const updatedLobby = await lobbyDetails();
      localStorage.setItem("ticket", JSON.stringify(false));
      setTicketOwned(false);
      socket.emit("MY_MONEY", { player: currenPlayer, code: yourData.code });
      socket.emit("FETCHING_YOUR_TICKETS", {
        lobby: updatedLobby,
        you: yourData,
      });
      socket.emit("TRACK_MONEY", {
        code: yourData.code,
      });
      if (res.message === "Rent Duble") {
        socket.emit("SOME_BUY", {
          lobby: updatedLobby,
          position: lobby.positions[currenPlayer].position,
          player: currenPlayer,
          code: yourData.code,
          dubble: "dubble",
        });
        setOwnedData(
          `Congrats! You now own 3+ properties of the same color — Double Rent Unlocked!`
        );
      } else if (res.message === "UPDATED") {
        socket.emit("SOME_BUY", {
          lobby: updatedLobby,
          position: lobby.positions[currenPlayer].position,
          player: currenPlayer,
          code: yourData.code,
          upgrade: true,
        });
      } else if (res.message !== "BUYED") {
        setOwnedData(res.message);
      } else {
        socket.emit("SOME_BUY", {
          lobby: updatedLobby,
          position: lobby.positions[currenPlayer].position,
          player: currenPlayer,
          code: yourData.code,
        });
      }
    } else {
      alert("Bhai Pehle Pahuch Toh Jane Do");
    }
  };
  const OK = () => {
    setOwnedData(null);
  };
  const Cut = () => {
    localStorage.setItem("ticket", JSON.stringify(false));
    setTicketOwned(false);
    socket.emit("WHO_NEXT", { code: yourData.code, player: currenPlayer });
  };
  return (
    <div className="game-interface-container">
      {/* <div className="result">
        <Result game={gameData} />
      </div> */}
      <img
        src="../../src/assets/logo.png"
        alt="World Tycoon Logo"
        className="game-logo"
      />
      <div className="All-players-info">
        <div className="p1">
          <div className="p-red2"></div>

          <p
            className={
              currentPositions?.[currenPlayer]?.id === gameData?.host?._id
                ? "curr gold"
                : "comm"
            }
          >
            {`${gameData?.host?.userName}: ${currentPositions?.player1?.money} `}
          </p>
        </div>

        {gameData?.players?.map((ele, idx) => (
          <div className="p1">
            <div className={`col${idx}`}></div>

            <p
              className={
                currentPositions?.[currenPlayer]?.id === ele?._id
                  ? "curr gold"
                  : "comm"
              }
            >
              {`${ele?.userName}: ${
                currentPositions?.[`player${idx + 2}`]?.money ?? ""
              }`}
            </p>
          </div>
        ))}
      </div>

      <div className="Bank-Info">
        <p>BANK</p>
        <h3>${bankMoney ?? ""}</h3>
        {/* <p>Tickets Left: 24</p> */}
      </div>

      <div className="Players-Info">
        {Object.keys(currentPositions).map((playerKey) => {
          const player = currentPositions[playerKey];
          return player.id === yourData?.userDetail?._id ? (
            <>
              <p>{yourData?.userDetail?.userName}</p>
              <h2 key={player.id}>${player.money}</h2>
            </>
          ) : null;
        })}
      </div>
      {ticketOwned &&
      currentPositions?.[currenPlayer]?.id === yourData?.userDetail?._id ? (
        <>
          <div className="gameTicket Z1000">
            <Bye ticketInfo={ticketData} Buy={Buy} Cut={Cut} />
          </div>
        </>
      ) : (
        ""
      )}
      {clickTicket ? (
        <>
          <div className="gameTicket">
            <TicketInfo ticketInfo={clickTicket} Cut={cross} />
          </div>
        </>
      ) : (
        ""
      )}
      {sellTicket ? (
        <>
          <div className="gameTicket">
            <Sell ticketInfo={sellTicket} Cut={crossSell} SellTick={SellTick} />
          </div>
        </>
      ) : (
        ""
      )}
      <div className="randomNumber">
        <h2>{random ? random : ""}</h2>
      </div>
      {!ticketOwned &&
      !inProgress &&
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
        <div className="ticketBox">
          <TicketsOwned
            ownedTicketClick={ownedTicketClick}
            tickets={yourTickets}
          />
          {chanceAndUno ? <ChanceAndUno cut={crossChance} /> : ""}
        </div>
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
              <div
                className={`leftCards ${ele.Color}`}
                onClick={() => clickedOnTicket(ele.id)}
              >
                <h4 className="CountryName">{ele.Name}</h4>

                <div className="flag-Container">
                  <img
                    src={`../../src/assets/flags/${ele.flag}`}
                    alt="Flag of Australia"
                  />
                  {ele.price !== 0 ? <h4>${ele.price}</h4> : ""}
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
              <div
                className={`topCards ${ele.Color}`}
                onClick={() => clickedOnTicket(ele.id)}
              >
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
                  {ele.price !== 0 ? <h4>${ele.price}</h4> : ""}
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
              <div
                className={`leftCards ${ele.Color}`}
                onClick={() => clickedOnTicket(ele.id)}
              >
                <h4 className="CountryName">{ele.Name}</h4>

                <div className="flag-Container">
                  <img
                    src={`../../src/assets/flags/${ele.flag}`}
                    alt="Flag of Australia"
                  />
                  {ele.price !== 0 ? <h4>${ele.price}</h4> : ""}
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
              <div
                className={`topCards ${ele.Color}`}
                onClick={() => clickedOnTicket(ele.id)}
              >
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
                  {ele.price !== 0 ? <h4>${ele.price}</h4> : ""}
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
