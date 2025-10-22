const express = require('express');
const cors = require('cors');
const createdGames = require('./models/gameCreation')
const http = require('http');
const { Server } = require('socket.io');
const { userDetailsRouter, logInRouter, isUserLoggedIn, logOutUsserRouter, createGameRouter, joinGameRouter, yourDetailRouter, leaveLobbyRouter } = require('./router/clientRouter');
const { default: mongoose } = require('mongoose');


const DB_URL = "mongodb+srv://root:root@harsh.tcproj.mongodb.net/World_Tycoon?retryWrites=true&w=majority&appName=harsh"

const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);


const app = express()

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
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
  socket.on("POSITIONS", (data) => {
    // console.log(data)
    // createdGames.findOne({ code: data.code }).then((lobby => {
    //   io.to(data.code).emit("HERE_ARE_POSITION", { lobbyDetail: lobby });
    // }))
  })
})

const store = new MongoDBStore({
  uri: DB_URL,
  collection: 'session'
})

app.use(session({
  secret: "HVC",
  resave: false,
  saveUninitialized: true,
  store: store
}))

app.use((req, res, next) => {
  console.log("cookie check middleware", req.get("Cookie"))
  req.isLoggedIn = req.session.isLoggedIn
  next()
})


app.use(cors({
  origin: "http://localhost:5173", // 👈 your React frontend URL
  credentials: true // 👈 allow sending cookies across origins
}))
app.use(express.json())

app.use('/api/signup', userDetailsRouter)
app.use('/api/login', logInRouter)

app.use('/api/isLogged', isUserLoggedIn)
app.use('/api/logout', logOutUsserRouter)
app.use('/api/createGame', createGameRouter)
app.use('/api/joinGame', joinGameRouter)
app.use('/api/yourDetail', yourDetailRouter)
app.use('/api/leaveLobby', leaveLobbyRouter);

const PORT = 3000;
mongoose.connect(DB_URL)
  .then(() => {
    console.log('moongose Connected')
    server.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`)
    })
  })

