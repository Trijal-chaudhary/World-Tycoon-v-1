const express = require('express');
const { postUserDetails, postLogIn, getIsUserLogged, getUserLogOut, postCreateGame, getLobby } = require('../controller/clientControler');

const userDetailsRouter = express.Router();
const logInRouter = express.Router();
const isUserLoggedIn = express.Router();
const logOutUsserRouter = express.Router();
const createGameRouter = express.Router();


userDetailsRouter.post('/', postUserDetails);
logInRouter.post('/', postLogIn)
isUserLoggedIn.get('/', getIsUserLogged)
logOutUsserRouter.get('/', getUserLogOut)
createGameRouter.post('/', postCreateGame)
createGameRouter.get('/', getLobby);

exports.userDetailsRouter = userDetailsRouter;
exports.logInRouter = logInRouter;
exports.isUserLoggedIn = isUserLoggedIn;
exports.logOutUsserRouter = logOutUsserRouter;
exports.createGameRouter = createGameRouter;