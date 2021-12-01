const express = require("express")
const {
  createServer
} = require("http")
const {
  Server
} = require("socket.io")
const mysql = require("mysql")
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auth'
}, (err) => {
  console.log(err)
})

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

let count = 0

io.on("connection", (socket) => {
  console.log("a user connected!")
  count++
  io.emit("counter", count)

  socket.on("disconnect", () => {
    console.log("a user disconnected")
    count--
    io.emit("counter", count)

  })

  socket.on("doDB", (socket) => {
    console.log("emmited")
    connection.query("select * from test", (err, result) => {
      // result = JSON.parse(result)
      result = JSON.stringify(result)
      result = JSON.parse(result)
      console.log(result)
      if (err) {
        io.emit("db", err)
      }
      io.emit("db", result)
    })
  })
})


httpServer.listen(process.env.PORT || 3000)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.use(express.static(__dirname))
