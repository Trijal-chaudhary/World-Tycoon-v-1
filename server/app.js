const express = require('express');
const cors = require('cors');
const createdGames = require('./models/gameCreation')
const http = require('http');
const { Server } = require('socket.io');
const { userDetailsRouter, logInRouter, isUserLoggedIn, logOutUsserRouter, createGameRouter, joinGameRouter, yourDetailRouter, leaveLobbyRouter, startedGameRouter, dieRolledRouter, buyRouter, checkTicketRouter, resultRouter } = require('./router/clientRouter');
const { default: mongoose } = require('mongoose');


const DB_URL = "mongodb+srv://root:root@harsh.tcproj.mongodb.net/World_Tycoon?retryWrites=true&w=majority&appName=harsh"

const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);


const app = express()

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://192.168.0.103:5173"],
    methods: ["GET", "POST"],
  }
})

io.on('connection', (socket) => {
  console.log("socket:", socket.id)
  socket.on("SOMEONE_JOINS", (data) => {
    // console.log(data)
    socket.join(data.code);
    createdGames.findOne({ code: data.code }).then((lobby => {
      io.to(data.code).emit("NEW_PLAYER_JOINED", { lobbyDetail: lobby });
    }))
  })
  socket.on("MY_DETAILS", (data) => {
    socket.emit("YOUR_DETAILS", { yourDetails: data.you })
  })
  socket.on("PLAYER_MOVED", (data) => {
    socket.join(data.code);
    io.to(data.code).emit("I_MOVED", { outcome: data.outcome, player: data.player });
  })
  socket.on("WHO_NEXT", async (data) => {
    socket.join(data.code);
    const lobby = await createdGames.findOne({ code: data.code })
    const length = Object.keys(lobby.positions).length;
    const next = (lobby.current + 1) % length;
    lobby.current = next;
    await lobby.save();
    const position = lobby.positions[data.player].position
    io.to(data.code).emit("NEXT_IS", { player: next, position: position });

  })
  socket.on("NAVIGATE_GAME", (data) => {
    socket.join(data.code);
    io.to(data.code).emit("NAVIGATING", { message: "navigate" })
  })
  socket.on("POSITION_CHANGE", async (data) => {
    const lobby = await createdGames.findOne({ code: data.code })
    const currPos = lobby.positions[data.player].position;
    const ticketInfo = lobby.theme.find(item => item.id === currPos + 1)
    // console.log(ticketInfo);
    // console.log(currPos)
    socket.emit("TICKET_INFO", { ticketInfo: ticketInfo })
  })
  socket.on("MY_MONEY", async (data) => {
    socket.join(data.code);
    const lobby = await createdGames.findOne({ code: data.code })
    const money = lobby.positions;
    io.to(data.code).emit("YOUR_MONEY", { position: money, bankMoney: lobby.Bank })
  })
  socket.on("FETCHING_YOUR_TICKETS", (data) => {
    // console.log(data.you);
    let red = [], blue = [], yellow = [], green = [], gray = [];
    Object.keys(data.lobby.positions).forEach((playerKey) => {
      if (data.lobby.positions[playerKey].id === data.you.userDetail._id) {
        red = data.lobby.theme.filter((ele) => ele.Color === "red" && ele.owner === playerKey);
        blue = data.lobby.theme.filter((ele) => ele.Color === "blue" && ele.owner === playerKey);
        yellow = data.lobby.theme.filter((ele) => ele.Color === "yellow" && ele.owner === playerKey);
        green = data.lobby.theme.filter((ele) => ele.Color === "green" && ele.owner === playerKey);
        gray = data.lobby.theme.filter((ele) => ele.Color === "gray" && ele.owner === playerKey);
        console.log(red, playerKey);
      }

    });
    socket.emit("YOUR_TICKETS", { red: red, blue: blue, yellow: yellow, green: green, gray: gray })
  })
  socket.on("TRACK_MONEY", async (data) => {
    // socket.join(data.code);
    const lobby = await createdGames.findOne({ code: data.code })
    Object.keys(lobby.positions).forEach((player) => {
      console.log(lobby.positions[player].money, player)
      if (lobby.positions[player].money <= -5000) {
        // console.log("BankCrupt")
        io.to(data.code).emit("BANKRUPT", { player: player })
      }
    })
    // console.log(data);
  })
})

const store = new MongoDBStore({
  uri: DB_URL,
  collection: 'session'
})
app.use(cors({
  origin: ["http://localhost:5173", "http://192.168.0.103:5173"], // 👈 your React frontend URL
  credentials: true // 👈 allow sending cookies across origins
}))

app.use(session({
  secret: "HVC",
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    httpOnly: true,
    secure: false,          // false because you're using http://
    sameSite: "lax",        // ✅ works well on same-network, avoids "None" issue
    maxAge: 1000 * 60 * 60 * 5
  }
}))

app.use((req, res, next) => {
  console.log("cookie check middleware", req.get("Cookie"))
  req.isLoggedIn = req.session.isLoggedIn
  next()
})



app.use(express.json())

app.use('/api/signup', userDetailsRouter)
app.use('/api/login', logInRouter)

app.use('/api/isLogged', isUserLoggedIn)
app.use('/api/logout', logOutUsserRouter)
app.use('/api/createGame', createGameRouter)
app.use('/api/joinGame', joinGameRouter)
app.use('/api/yourDetail', yourDetailRouter)
app.use('/api/leaveLobby', leaveLobbyRouter);
app.use('/api/startGame', startedGameRouter)
app.use('/api/dieRolled', dieRolledRouter)
app.use('/api/buy', buyRouter)
app.use('/api/ticketCheck', checkTicketRouter);
app.use('/api/results', resultRouter)
const PORT = 3000;
mongoose.connect(DB_URL)
  .then(() => {
    console.log('moongose Connected')
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`http://192.168.0.103:${PORT}`)
    })
  })

