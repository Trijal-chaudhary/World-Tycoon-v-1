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
  console.log(req.body)

  const { name, userName, password } = req.body;
  const userDetails = new PlayerDetails({ name, userName, password })
  await userDetails.save()

  res.status(201).json("lallantap")
}
exports.postLogIn = async (req, res, next) => {
  console.log(req.body)
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
  console.log(gameCreated)
  res.status(201).json(gameCreated)
}

exports.getLobby = async (req, res, next) => {
  console.log(req.session)
  // const lobbyDetails = await createdGames.findOne(code);
  res.status(201)

}