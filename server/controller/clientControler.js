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


const PlayerDetails = require('../models/clientDetailsModel')
const createdGames = require('../models/gameCreation')


exports.postUserDetails = async (req, res, next) => {
  // console.log(req.body)

  const { name, userName, password } = req.body;
  const userDetails = new PlayerDetails({ name, userName, password })
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
  console.log(req.body)
  const game = await createdGames.findOne({ code: req.session.code })
  if (game.host._id.toString() === req.body.id) {
    return res.status(201).json({ host: true });
  } else {
    game.players = game.players.filter(player => player._id.toString() !== req.body.id)
    await game.save()
    // console.log(game);
  }
  res.status(201).json({ host: false })

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
  console.log(req.body)
  const { player } = req.body;
  const lobby = await createdGames.findOne({ code: req.session.code })
  const position = lobby.positions[player].position + 1;
  const ticket = lobby.theme.find(ele => ele.id === position)
  ticket.owner = player;
  // const price = ticket.price
  lobby.positions[player].money = lobby.positions[player].money - ticket.price
  lobby.Bank = lobby.Bank + ticket.price
  lobby.markModified('positions');
  lobby.markModified('theme')
  await lobby.save()
  console.log(ticket, lobby.positions[player])
  res.status(201).json({ message: "BUYED" });
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
        lobby.positions[player].money -= 500;
        lobby.Bank += 500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Pay a $500 speeding ticket." })
      case 2:
        lobby.positions[player].money += 2000;
        lobby.Bank -= 2000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Bank error in your favor! Collect $2000." })
      case 3:
        lobby.positions[player].money -= 3000;
        lobby.Bank += 3000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "You are caught in a tax audit. Pay the Bank $3000." })
      case 4:
        lobby.positions[player].money += 2500;
        lobby.Bank -= 2500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "You are promoted! Collect a $2500 bonus from the Bank." })
      case 5:
        lobby.positions[player].money -= 1500;
        lobby.Bank += 1500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Pay school and medical fees of $1500." })
      case 6:
        lobby.positions[player].money += 1000;
        lobby.Bank -= 1000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "You win a local lottery. Collect $1000." })
      case 7:
        lobby.positions[player].money += 4000;
        lobby.Bank -= 4000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "From the sale of stocks, you get $4000." })
      case 8:
        lobby.positions[player].money -= 1000;
        lobby.Bank += 1000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Poor property maintenance! Pay $1000 to the Bank for immediate repairs." })
      case 9:
        lobby.positions[player].money -= 1500;
        lobby.Bank += 1500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Pay your insurance premium. Pay $1500." })
      case 10:
        lobby.positions[player].money += 500 * (lobby.positions.length - 1);
        Object.keys(lobby.positions).forEach((playerKey) => {
          if (playerKey !== player) {
            lobby.positions[playerKey].money -= 500;
          }
        })
        lobby.markModified('positions');
        await lobby.save();
        return res.status(201).json({ message: " You host a state dinner. Collect $500 from each player." })
      case 11:
        lobby.positions[player].money += 2000;
        lobby.Bank -= 2000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: " Holiday bonus! Collect $2000 from the Bank." })
      case 12:
        lobby.positions[player].money += 5000;
        lobby.Bank -= 5000;
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
        lobby.positions[player].money -= 2000;
        lobby.Bank += 2000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Loss in the share market. Pay $2000 to the Bank." })
      case 2:
        lobby.positions[player].money += 1000;
        lobby.Bank -= 1000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "You have won a crossword competition. Collect $1000 from the Bank." })
      case 3:
        lobby.positions[player].money -= 1500;
        lobby.Bank += 1500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: " Pay a $1500 fine for a traffic violation." })
      case 4:
        lobby.positions[player].money += 5000;
        lobby.Bank -= 5000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: " Your building loan is approved! Collect $5000 from the Bank." })
      case 5:
        lobby.positions[player].money += 3000;
        lobby.Bank -= 3000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Your businesses are booming! The Bank pays you a dividend of $3000." })
      case 6:
        lobby.positions[player].money -= 2500;
        lobby.Bank += 2500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Caught dumping industrial waste. Pay a $2500 environmental fine." })
      case 7:
        lobby.positions[player].money += 1000 * (lobby.positions.length - 1);
        Object.keys(lobby.positions).forEach((playerKey) => {
          if (playerKey !== player) {
            lobby.positions[playerKey].money -= 1000;
          }
        })
        lobby.markModified('positions');
        await lobby.save();
        return res.status(201).json({ message: "It's your birthday! Collect $1000 from each player." })
      case 8:
        lobby.positions[player].money -= 500 * (lobby.positions.length - 1);
        Object.keys(lobby.positions).forEach((playerKey) => {
          if (playerKey !== player) {
            lobby.positions[playerKey].money += 500;
          }
        })
        lobby.markModified('positions');
        await lobby.save();
        return res.status(201).json({ message: "You are elected Chairman of the Board. Pay each player $500." })
      case 9:
        lobby.positions[player].money -= 2500;
        lobby.Bank += 2500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Loss due to fire in your godown. Pay $2500." })
      case 10:
        lobby.positions[player].money -= 500;
        lobby.Bank += 500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Pay a $500 fine for a traffic violation." })
      case 11:
        lobby.positions[player].money += 1500;
        lobby.Bank -= 1500;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Collect your $1500 salary." })
      case 12:
        lobby.positions[player].money -= 1000;
        lobby.Bank += 1000;
        lobby.markModified('positions');
        lobby.markModified('Bank');
        await lobby.save();
        return res.status(201).json({ message: "Your car needs repairs. Pay $1000." })
      default:
        return res.status(201).json({ message: "Invalid outCome" })
    }
  } else if (ticket.Name === "Start") {
    lobby.positions[player].money += 1500;
    lobby.markModified('positions');
    await lobby.save();
    return res.status(201).json({ message: "You have hit START! $1500 just landed in your account!" })
  } else if (ticket.Name === "Party House") {
    lobby.positions[player].money += 200 * (lobby.positions.length - 1);
    Object.keys(lobby.positions).forEach((playerKey) => {
      if (playerKey !== player) {
        lobby.positions[playerKey].money -= 200;
      }
    })
    lobby.markModified('positions');
    await lobby.save();
    return res.status(201).json({ message: "Party time! $200 collected from each player and added to your stash!" })
  } else if (ticket.Name === "Duty" || ticket.Name === "Coustom") {
    lobby.positions[player].money -= 200;
    lobby.Bank += 200;
    lobby.markModified('positions');
    lobby.markModified('Bank');
    await lobby.save();
    return res.status(201).json({ message: "Customs Duty! $200 deducted from your wallet and added to the Bank!" })
  } else if (ticket.Name === "Resort") {
    lobby.positions[player].money -= 50 * (lobby.positions.length - 1);
    Object.keys(lobby.positions).forEach((playerKey) => {
      if (playerKey !== player) {
        lobby.positions[playerKey].money += 50;
      }
    })
    lobby.markModified('positions');
    await lobby.save();
    return res.status(201).json({ message: "Resort Fee! $50 distributed to all players!" })
  } else if (ticket.Name === "Jail") {
    lobby.positions[player].money -= 500;
    lobby.Bank += 500;
    lobby.markModified('positions');
    lobby.markModified('Bank');
    await lobby.save();
    return res.status(201).json({ message: "Jail Time! $500 deducted and added to the bank!" })
  }
  else if (!ticket.owner) {
    return res.status(201).json({ message: "noOwner" })
  } else if (ticket.owner === player) {
    return res.status(201).json({ message: "youOwner" })
  } else {
    lobby.positions[player].money -= ticket.rent;
    lobby.positions[ticket.owner].money += ticket.rent;
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
