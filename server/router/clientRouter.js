const express = require('express');
const { postUserDetails, postLogIn, getIsUserLogged, getUserLogOut, postCreateGame, getLobby, postEnterLobby, getYourDetails, postLeaveLobby, postGameStart, postDieRolled, postBuy, postTicketCheck, getResult, postSellTicket } = require('../controller/clientControler');

const userDetailsRouter = express.Router();
const logInRouter = express.Router();
const isUserLoggedIn = express.Router();
const logOutUsserRouter = express.Router();
const createGameRouter = express.Router();
const joinGameRouter = express.Router();
const yourDetailRouter = express.Router();
const leaveLobbyRouter = express.Router();
const startedGameRouter = express.Router();
const dieRolledRouter = express.Router();
const buyRouter = express.Router();
const checkTicketRouter = express.Router();
const resultRouter = express.Router();
const sellTicketRouter = express.Router();

userDetailsRouter.post('/', postUserDetails);
logInRouter.post('/', postLogIn)
isUserLoggedIn.get('/', getIsUserLogged)
logOutUsserRouter.get('/', getUserLogOut)
createGameRouter.post('/', postCreateGame)
createGameRouter.get('/', getLobby);
joinGameRouter.post('/', postEnterLobby);
yourDetailRouter.get('/', getYourDetails);
leaveLobbyRouter.post('/', postLeaveLobby)
startedGameRouter.post('/', postGameStart);
dieRolledRouter.post('/', postDieRolled);
buyRouter.post('/', postBuy)
checkTicketRouter.post('/', postTicketCheck);
resultRouter.get("/", getResult)
sellTicketRouter.post('/', postSellTicket)

exports.userDetailsRouter = userDetailsRouter;
exports.logInRouter = logInRouter;
exports.isUserLoggedIn = isUserLoggedIn;
exports.logOutUsserRouter = logOutUsserRouter;
exports.createGameRouter = createGameRouter;
exports.joinGameRouter = joinGameRouter;
exports.yourDetailRouter = yourDetailRouter;
exports.leaveLobbyRouter = leaveLobbyRouter;
exports.startedGameRouter = startedGameRouter;
exports.dieRolledRouter = dieRolledRouter
exports.buyRouter = buyRouter;
exports.checkTicketRouter = checkTicketRouter;
exports.resultRouter = resultRouter
exports.sellTicketRouter = sellTicketRouter;