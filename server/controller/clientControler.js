//<====Generation Of Code====>
function generateCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let result = '';
  for (let i = 0; i <= 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}


const { json } = require('express');
const PlayerDetails = require('../models/clientDetailsModel')
const createdGames = require('../models/gameCreation')
const Themes = require('../models/theme')

exports.postUserDetails = async (req, res, next) => {
  // console.log(req.body)

  const { name, userName, password, avtar } = req.body;
  const userDetails = new PlayerDetails({ name, userName, password, avtar })
  await userDetails.save()

  res.status(201).json("lallantap")
}
exports.postLogIn = async (req, res, next) => {
  // console.log(req.body)
  const { userName, password } = req.body
  const userDetail = await PlayerDetails.findOne({ userName, password })
  if (userDetail) {
    req.session.isLoggedIn = true;
    req.session.userDetail = userDetail;
    req.session.code = "";
  }
  res.status(201).json(userDetail);
}

exports.getIsUserLogged = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.json({ isLoggedIn: true, user: req.session.userDetail });
  }
  res.json({ isLoggedIn: false });
}

exports.getUserLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Error destroying session:', err);
      return res.status(500).json({ isLoggedIn: true, message: "Logout failed on server." });
    }
    res.json({ isLoggedIn: false, message: "Logged out successfully." });
  })

}

exports.postCreateGame = async (req, res, next) => {
  const code = await generateCode();
  const gameCreated = new createdGames({ code, host: req.session.userDetail, players: [] })
  await gameCreated.save()
  req.session.code = code;
  // console.log(gameCreated)
  res.status(201).json(gameCreated)
}

exports.getLobby = async (req, res, next) => {
  // console.log(req.session)
  const lobbyDetails = await createdGames.findOne({ code: req.session.code });
  // console.log(lobbyDetails)
  res.status(201).json(lobbyDetails)

}

exports.postEnterLobby = async (req, res, next) => {
  // console.log(req.body.code);
  const game = await createdGames.findOne({ code: req.body.code })


  if (game) {
    if (!game.players.some(player => player._id.toString() === req.session.userDetail._id.toString()) && game.host._id.toString() !== req.session.userDetail._id.toString()) {
      game.players.push(req.session.userDetail)
      await game.save()
    }
    req.session.code = req.body.code;

    // console.log(game)
    return res.status(201).json({ added: true })
  }
  res.status(201).json({ added: false })
}

exports.getYourDetails = (req, res, next) => {
  res.json(req.session);
}

exports.postLeaveLobby = async (req, res, next) => {
  // console.log(req.body)
  const game = await createdGames.findOne({ code: req.session.code })
  if (game.host._id.toString() === req.body.id) {
    await game.deleteOne();
    return res.status(201).json({ host: true });
  } else {
    game.players = game.players.filter(player => player._id.toString() !== req.body.id)
    await game.save()
    // console.log(game);
  }
  res.status(201).json({ host: false })

}
exports.postDeleteGame = async (req, res, next) => {
  const game = await createdGames.findOne({ code: req.session.code })
  if (!game) {
    return res.status(201).json({ message: "Game Allready Deleted" })

  }
  await game.deleteOne();
  res.status(201).json({ message: "Game Deleted" })
}

exports.postGameStart = async (req, res, next) => {
  const startedGame = await createdGames.findOne({ code: req.session.code })
  const position = {};
  position['player1'] = { id: startedGame.host._id, position: 0, outCome: 0, money: 20000 }
  startedGame.players.forEach((play, idx) => {
    position[`player${idx + 2}`] = { id: play._id, position: 0, outCome: 0, money: 20000 }
  })
  startedGame.positions = position;
  await startedGame.save()
  console.log(startedGame.positions)

  res.status(201).message({ message: "game Started" });
}
exports.postDieRolled = async (req, res, next) => {
  const lobby = await createdGames.findOne({ code: req.session.code })
  for (key in lobby.positions) {
    if (String(lobby.positions[key].id) === String(req.session.userDetail._id)) {
      lobby.positions[key].position = (lobby.positions[key].position + req.body.outcome) % 36;
      // 4. Tell Mongoose that the 'positions' object was modified
      lobby.markModified('positions');
    }
  }
  await lobby.save();
  // console.log(lobby.positions)

  // console.log(req.body);
  res.status(201).json({ message: "updated" });
}

exports.postBuy = async (req, res, next) => {
  // console.log(req.body)
  const { player } = req.body;
  const lobby = await createdGames.findOne({ code: req.session.code })
  const position = lobby.positions[player].position + 1;
  const ticket = lobby.theme.find(ele => ele.id === position)
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  if (ticket.owner === player) {
    let ticketRent = ticket.rent
    let house = "Site Only"
    // if (ticket.rent < ticket.house["1House"]) {
    if (!ticket.house.Site) {
      ticket.house.Site = ticket.rent;
    }
    // }
    // console.log(true);
    for (const [key, value] of Object.entries(ticket.house)) {
      // console.log(ticket.rent, value)
      if (ticket.rent < value) {
        ticketRent = value;
        house = key
        break;
      }
    }
    ticket.rent = ticketRent;
    const currentMoney = lobby.positions[player].money ?? 0;
    const ticketMoney = Number(ticket.price) ?? 0;
    const bankMoney = lobby.Bank ?? 0;
    lobby.positions[player].money = currentMoney - ticketMoney;
    lobby.Bank = bankMoney + ticketMoney;
    lobby.markModified('positions');
    lobby.markModified('theme');
    await lobby.save()
    res.status(201).json({ message: "UPDATED", house: house });
  }
  else {
    ticket.owner = player;
    // const price = ticket.price
    // const sameColor = lobby.theme.filter(ele => ele.Color === ticket.Color && ele.owner === ticket.owner);
    const currentMoney = lobby.positions[player].money ?? 0;
    const ticketMoney = Number(ticket.price) ?? 0;
    const bankMoney = lobby.Bank ?? 0;
    lobby.positions[player].money = currentMoney - ticketMoney;
    lobby.Bank = bankMoney + ticketMoney;
    lobby.markModified('positions');
    lobby.markModified('theme')
    await lobby.save()
    if (ticket.Name === "Roadways") {
      const sameLink = lobby.theme.filter(ele => ele.Name === "Waterways" && ele.owner === ticket.owner);
      // const len = Object.keys(sameLink).length;
      if (sameLink.length > 0) {
        const currRent = sameLink[0].rent ?? 0
        const ticRent = ticket.rent ?? 0
        sameLink[0].rent = currRent * 2
        ticket.rent = ticRent * 2
        // lobby.markModified('positions');
        lobby.markModified('theme')
        await lobby.save()
        return res.status(201).json({ message: "Congrats! You now own Roadways + Waterways — your rent just doubled!" });
      }

      return res.status(201).json({ message: "BUYED" });

    } else if (ticket.Name === "Waterways") {
      const sameLink = lobby.theme.filter(ele => ele.Name === "Roadways" && ele.owner === ticket.owner);
      // const len = Object.keys(sameLink).length;
      if (sameLink.length > 0) {
        const currRent = sameLink[0].rent ?? 0
        const ticRent = ticket.rent ?? 0
        sameLink[0].rent = currRent * 2
        ticket.rent = ticRent * 2
        // lobby.markModified('positions');
        lobby.markModified('theme')
        await lobby.save()
        return res.status(201).json({ message: "Congrats! You now own Roadways + Waterways — your rent just doubled!" });
      }
      return res.status(201).json({ message: "BUYED" });

    } else if (ticket.Name === "Railways") {
      const sameLink = lobby.theme.filter(ele => ele.Name === "Airways" && ele.owner === ticket.owner);
      // const len = Object.keys(sameLink).length;
      if (sameLink.length > 0) {
        const currRent = sameLink[0].rent ?? 0
        const ticRent = ticket.rent ?? 0
        sameLink[0].rent = currRent * 2
        ticket.rent = ticRent * 2
        // lobby.markModified('positions');
        lobby.markModified('theme')
        await lobby.save()
        return res.status(201).json({ message: "Congrats! You now own Railways + Airways — your rent just doubled!" });
      }
      return res.status(201).json({ message: "BUYED" });

    } else if (ticket.Name === "Airways") {
      const sameLink = lobby.theme.filter(ele => ele.Name === "Railways" && ele.owner === ticket.owner);
      // const len = Object.keys(sameLink).length;
      if (sameLink.length > 0) {
        const currRent = sameLink[0].rent ?? 0
        const ticRent = ticket.rent ?? 0
        sameLink[0].rent = currRent * 2
        ticket.rent = ticRent * 2
        // lobby.markModified('positions');
        lobby.markModified('theme')
        await lobby.save()
        return res.status(201).json({ message: "Congrats! You now own Railways + Airways — your rent just doubled!" });
      }
      return res.status(201).json({ message: "BUYED" });

    } else if (ticket.Name === "Petroleum") {
      const sameLink = lobby.theme.filter(ele => ele.Name === "Satellite" && ele.owner === ticket.owner);
      // const len = Object.keys(sameLink).length;
      if (sameLink.length > 0) {
        const currRent = sameLink[0].rent ?? 0
        const ticRent = ticket.rent ?? 0
        sameLink[0].rent = currRent * 2
        ticket.rent = ticRent * 2
        // lobby.markModified('positions');
        lobby.markModified('theme')
        await lobby.save()
        return res.status(201).json({ message: "Congrats! You now own Petroleum + Satellite — your rent just doubled!" });
      }
      return res.status(201).json({ message: "BUYED" });

    } else if (ticket.Name === "Satellite") {
      const sameLink = lobby.theme.filter(ele => ele.Name === "Petroleum" && ele.owner === ticket.owner);
      // const len = Object.keys(sameLink).length;
      if (sameLink.length > 0) {
        const currRent = sameLink[0].rent ?? 0
        const ticRent = ticket.rent ?? 0
        sameLink[0].rent = currRent * 2
        ticket.rent = ticRent * 2
        // lobby.markModified('positions');
        lobby.markModified('theme')
        await lobby.save()
        return res.status(201).json({ message: "Congrats! You now own Petroleum + Satellite — your rent just doubled!" });
      }
      return res.status(201).json({ message: "BUYED" });

    } else {
      const sameColor = lobby.theme.filter(ele => ele.Color === ticket.Color && ele.owner === ticket.owner);
      const len = Object.keys(sameColor).length;
      if (len >= 3) {
        sameColor.forEach(ele => {
          if (!ele.house.Site) {
            const currRent = ele.rent ?? 0;
            ele.house.Site = currRent;
            ele.rent = currRent * 2;
          }
        })
        lobby.markModified('positions');
        lobby.markModified('theme');
        await lobby.save()
        res.status(201).json({ message: "Rent Duble" });

      } else {
        res.status(201).json({ message: "BUYED" });

      }
    }
    console.log(len, sameColor);
    // console.log(ticket, lobby.positions[player])

  }

}

exports.postTicketCheck = async (req, res, next) => {
  const { player, outcome } = req.body;
  const lobby = await createdGames.findOne({ code: req.session.code })
  const position = lobby.positions[player].position + 1;
  const ticket = lobby.theme.find(ele => ele.id === position)
  if (ticket.Name === "UNO") {
    // const outCome = lobby.positions[player].outCome;
    console.log(outcome)
    switch (outcome) {
      case 1:
        const currentMoney = lobby.positions[player].money ?? 0;
        const currentBank = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney - 500;
        lobby.Bank = currentBank + 500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Pay a $500 speeding ticket." })
      case 2:
        const currentMoney2 = lobby.positions[player].money ?? 0;
        const currentBank2 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney2 + 2000;
        lobby.Bank = currentBank2 + 2000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Bank error in your favor! Collect $2000." })
      case 3:
        const currentMoney3 = lobby.positions[player].money ?? 0;
        const currentBank3 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney3 - 3000;
        lobby.Bank = currentBank3 + 3000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "You are caught in a tax audit. Pay the Bank $3000." })
      case 4:
        const currentMoney4 = lobby.positions[player].money ?? 0;
        const currentBank4 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney4 + 2500;
        lobby.Bank = currentBank4 - 2500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "You are promoted! Collect a $2500 bonus from the Bank." })
      case 5:
        const currentMoney5 = lobby.positions[player].money ?? 0;
        const currentBank5 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney5 - 1500;
        lobby.Bank = currentBank5 + 1500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Pay school and medical fees of $1500." })
      case 6:
        const currentMoney6 = lobby.positions[player].money ?? 0;
        const currentBank6 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney6 + 1000;
        lobby.Bank = currentBank6 - 1000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "You win a local lottery. Collect $1000." })
      case 7:
        const currentMoney7 = lobby.positions[player].money ?? 0;
        const currentBank7 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney7 + 4000;
        lobby.Bank = currentBank7 - 4000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "From the sale of stocks, you get $4000." })
      case 8:
        const currentMoney8 = lobby.positions[player].money ?? 0;
        const currentBank8 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney8 - 1000;
        lobby.Bank = currentBank8 + 1000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Poor property maintenance! Pay $1000 to the Bank for immediate repairs." })
      case 9:
        const currentMoney9 = lobby.positions[player].money ?? 0;
        const currentBank9 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney9 - 1500;
        lobby.Bank = currentBank9 + 1500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Pay your insurance premium. Pay $1500." })
      case 10:
        const len = Object.keys(lobby.positions).length - 1;
        const currentMoney10 = lobby.positions[player].money ?? 0;
        lobby.positions[player].money = currentMoney10 + 500 * len;
        Object.keys(lobby.positions).forEach((playerKey) => {
          if (playerKey !== player) {
            const currPlayerMon = lobby.positions[playerKey].money ?? 0;
            lobby.positions[playerKey].money = currPlayerMon - 500;
          }
        })
        lobby.markModified('positions');
        await lobby.save();
        return res.status(201).json({ message: " You host a state dinner. Collect $500 from each player." })
      case 11:
        const currentMoney11 = lobby.positions[player].money ?? 0;
        const currentBank11 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney11 + 2000;
        lobby.Bank = currentBank11 - 2000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: " Holiday bonus! Collect $2000 from the Bank." })
      case 12:
        const currentMoney12 = lobby.positions[player].money ?? 0;
        const currentBank12 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney12 + 5000;
        lobby.Bank = currentBank12 - 5000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: " You've won the World Tycoon Grand Prize! Collect $5,000 from the Bank." })
      default:
        return res.status(201).json({ message: "Invalid Outcome" })
    }
  } else if (ticket.Name === "Chance") {
    // const outCome = lobby.positions[player].outCome;
    console.log(outcome)
    switch (outcome) {
      case 1:
        const currentMoney1 = lobby.positions[player].money ?? 0;
        const currentBank1 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney1 - 2000;
        lobby.Bank = currentBank1 + 2000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Loss in the share market. Pay $2000 to the Bank." })
      case 2:
        const currentMoney2 = lobby.positions[player].money ?? 0;
        const currentBank2 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney2 + 1000;
        lobby.Bank = currentBank2 - 1000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "You have won a crossword competition. Collect $1000 from the Bank." })
      case 3:
        const currentMoney3 = lobby.positions[player].money ?? 0;
        const currentBank3 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney3 - 1500;
        lobby.Bank = currentBank3 + 1500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: " Pay a $1500 fine for a traffic violation." })
      case 4:
        const currentMoney4 = lobby.positions[player].money ?? 0;
        const currentBank4 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney4 + 5000;
        lobby.Bank = currentBank4 + 5000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: " Your building loan is approved! Collect $5000 from the Bank." })
      case 5:
        const currentMoney5 = lobby.positions[player].money ?? 0;
        const currentBank5 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney5 - 3000;
        lobby.Bank = currentBank5 + 3000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Your businesses are booming! The Bank pays you a dividend of $3000." })
      case 6:
        const currentMoney6 = lobby.positions[player].money ?? 0;
        const currentBank6 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney6 - 2500;
        lobby.Bank = currentBank6 + 2500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Caught dumping industrial waste. Pay a $2500 environmental fine." })
      case 7:
        const len7 = Object.keys(lobby.positions).length - 1;
        const currentMoney7 = lobby.positions[player].money ?? 0;
        lobby.positions[player].money = currentMoney7 + 1000 * len7;
        Object.keys(lobby.positions).forEach((playerKey) => {
          if (playerKey !== player) {
            const currPlayerMon7 = lobby.positions[playerKey].money ?? 0;
            lobby.positions[playerKey].money = currPlayerMon7 - 1000;
          }
        })
        lobby.markModified('positions');
        await lobby.save();
        return res.status(201).json({ message: "It's your birthday! Collect $1000 from each player." })
      case 8:
        const len8 = Object.keys(lobby.positions).length - 1;
        const currentMoney8 = lobby.positions[player].money ?? 0;
        lobby.positions[player].money = currentMoney8 - 500 * len8;
        Object.keys(lobby.positions).forEach((playerKey) => {
          if (playerKey !== player) {
            const currPlayerMon7 = lobby.positions[playerKey].money ?? 0;
            lobby.positions[playerKey].money = currPlayerMon7 + 500;
          }
        })
        lobby.markModified('positions');
        await lobby.save();
        return res.status(201).json({ message: "You are elected Chairman of the Board. Pay each player $500." })
      case 9:
        const currentMoney9 = lobby.positions[player].money ?? 0;
        const currentBank9 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney9 - 2500;
        lobby.Bank = currentBank9 + 2500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Loss due to fire in your godown. Pay $2500." })
      case 10:
        const currentMoney10 = lobby.positions[player].money ?? 0;
        const currentBank10 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney10 - 500;
        lobby.Bank = currentBank10 + 500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Pay a $500 fine for a traffic violation." })
      case 11:
        const currentMoney11 = lobby.positions[player].money ?? 0;
        const currentBank11 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney11 + 1500;
        lobby.Bank = currentBank11 - 1500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Collect your $1500 salary." })
      case 12:
        const currentMoney12 = lobby.positions[player].money ?? 0;
        const currentBank12 = lobby.Bank ?? 0;
        lobby.positions[player].money = currentMoney12 - 1000;
        lobby.Bank = currentBank12 + 1000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Your car needs repairs. Pay $1000." })
      default:
        return res.status(201).json({ message: "Invalid outCome" })
    }
  } else if (ticket.Name === "Start") {
    const currentMoney = lobby.positions[player].money ?? 0;
    const currentBank = lobby.Bank ?? 0;
    lobby.positions[player].money = currentMoney + 1500;
    lobby.Bank = currentBank - 1500;
    lobby.markModified('positions');
    lobby.markModified('Bank');
    await lobby.save();
    return res.status(201).json({ message: "You have hit START! $1500 just landed in your account!" })
  } else if (ticket.Name === "Party House") {
    const len8 = Object.keys(lobby.positions).length - 1;
    const currentMoney8 = lobby.positions[player].money ?? 0;
    lobby.positions[player].money = currentMoney8 + 200 * len8;
    Object.keys(lobby.positions).forEach((playerKey) => {
      if (playerKey !== player) {
        const currPlayerMon7 = lobby.positions[playerKey].money ?? 0;
        lobby.positions[playerKey].money = currPlayerMon7 - 200;
      }
    })
    lobby.markModified('positions');
    await lobby.save();
    return res.status(201).json({ message: "Party time! $200 collected from each player and added to your stash!" })
  } else if (ticket.Name === "Duty" || ticket.Name === "Coustom") {
    const currentMoney = lobby.positions[player].money ?? 0;
    const currentBank = lobby.Bank ?? 0;
    lobby.positions[player].money = currentMoney - 200;
    lobby.Bank = currentBank + 200;
    lobby.markModified('positions');
    lobby.markModified('Bank');
    await lobby.save();
    return res.status(201).json({ message: "Customs Duty! $200 deducted from your wallet and added to the Bank!" })
  } else if (ticket.Name === "Resort") {
    const len8 = Object.keys(lobby.positions).length - 1;
    const currentMoney8 = lobby.positions[player].money ?? 0;
    lobby.positions[player].money = currentMoney8 - 50 * len8;
    Object.keys(lobby.positions).forEach((playerKey) => {
      if (playerKey !== player) {
        const currPlayerMon7 = lobby.positions[playerKey].money ?? 0;
        lobby.positions[playerKey].money = currPlayerMon7 + 50;
      }
    })
    lobby.markModified('positions');
    await lobby.save();
    return res.status(201).json({ message: "Resort Fee! $50 distributed to all players!" })
  } else if (ticket.Name === "Jail") {
    const currentMoney = lobby.positions[player].money ?? 0;
    const currentBank = lobby.Bank ?? 0;
    lobby.positions[player].money = currentMoney - 500;
    lobby.Bank = currentBank + 500;
    lobby.markModified('positions');
    lobby.markModified('Bank');
    await lobby.save();
    return res.status(201).json({ message: "Jail Time! $500 deducted and added to the bank!" })
  }
  else if (!ticket.owner) {
    return res.status(201).json({ message: "noOwner" })
  }
  else if (ticket.owner === player && (ticket.Color === "gray")) {
    return res.status(201).json({ message: "cantUpgrade" })
  } else if (ticket.owner === player && (ticket.rent === ticket.house["Hotel"])) {
    return res.status(201).json({ message: "Hotel" })
  } else if (ticket.owner === player) {
    return res.status(201).json({ message: "youOwner" })
  } else {
    const currentMoney = lobby.positions[player].money ?? 0;
    const ownerMoney = lobby.positions[ticket.owner].money ?? 0;
    const ticketRent = ticket.rent
    lobby.positions[player].money = currentMoney - ticketRent;
    lobby.positions[ticket.owner].money = ownerMoney + ticketRent;
    lobby.markModified('positions');
    await lobby.save();
    // Emit to all players in the room
    // io.to(req.session.code).emit("YOUR_MONEY", {
    //   position: lobby.positions,
    //   bankMoney: lobby.Bank,
    // });
    return res.status(201).json({ message: "yesOwner", owner: ticket.owner, rent: ticket.rent })
  }
  // console.log(position, ticket)
  res.status(201).json({ message: "owned" })
}
exports.getResult = async (req, res, next) => {
  // console.log("linkkkkkkkkkkk")
  const lobby = await createdGames.findOne({ code: req.session.code });
  const sort = Object.entries(lobby.positions).sort(
    ([, a], [, b]) => b.money - a.money
  );
  console.log(sort)
  res.status(201).json({ sort: sort, lobby: lobby });
}

exports.postSellTicket = async (req, res, next) => {
  const { position } = req.body;
  const lobby = await createdGames.findOne({ code: req.session.code })
  // const position = lobby.positions[player].position + 1;
  let player = ""; // Start with an empty string
  const userId = req.session.userDetail._id.toString(); // Get user ID from session and convert to string

  // Loop through player keys ("player1", "player2", etc.)
  for (const playerKey in lobby.positions) {
    // Safely access the position object and convert its ID to string
    const positionId = lobby.positions[playerKey]?.id?.toString();

    // Compare strings
    if (positionId === userId) {
      player = playerKey; // Assign the correct key ("player1", etc.)
      break; // Exit the loop once the player is found
    }
  }
  console.log(player);
  const ticket = lobby.theme.find(ele => ele.id === position)
  const ticketPrice = ticket.price ?? 0;
  const sellingPrice = ticketPrice / 2;
  const currentMoney = lobby.positions[player].money ?? 0;
  const currentBank = lobby.Bank ?? 0;
  lobby.positions[player].money = currentMoney + sellingPrice;
  lobby.Bank = currentBank - sellingPrice;
  delete ticket.owner;
  if (ticket.house["Site"]) {
    ticket.rent = ticket.house["Site"];
    delete ticket.house["Site"];
  }
  lobby.markModified('positions');
  lobby.markModified('Bank');
  lobby.markModified('theme');
  await lobby.save();
  const ticketrem = lobby.theme.filter(ele => ele.Color === ticket.Color && ele.owner === player);
  const len = ticketrem.length;
  if (len < 3) {
    ticketrem.forEach(ele => {
      if (ele.house.Site) {
        const currRent = ele.house.Site ?? 0;
        if (ele.rent === ele.house.Site * 2) {
          ele.rent = currRent;
          delete ele.house.Site
        }
      }
    })
    lobby.markModified('positions');
    lobby.markModified('theme');
    await lobby.save()
    return res.status(201).json({ message: `You have soled ${ticket.Name}`, broadcast: `${ticket.Name} returns to the Bank! ${player} makes a bold move — strategy over sentiment.` })

  }
  res.status(201).json({ message: `You have soled ${ticket.Name}`, broadcast: `${ticket.Name} returns to the Bank! ${player} makes a bold move — strategy over sentiment.` })

}
exports.getTheme = async (req, res, next) => {
  const themes = await Themes.find();
  console.log("true hello")
  // console.log(themes);
  res.status(201).json({ themes: themes });
}

exports.postTheme = async (req, res, next) => {
  const { themeName } = req.body;
  const theme = await Themes.findOne({ [themeName]: { $exists: true } });
  // console.log(theme.get(themeName))
  const themeDetails = theme.get(themeName)
  const lobby = await createdGames.findOne({ code: req.session.code })
  lobby.theme = themeDetails;
  lobby.markModified('theme');
  lobby.save();
  res.status(201).json({ message: "themesaved" });
}