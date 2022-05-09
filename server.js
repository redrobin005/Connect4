const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 3000
const socketio  = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

//static folder which is served to the client (public)
app.use(express.static(path.join(__dirname, "public"), {index:'start.html'}))

// start server
server.listen(PORT, () => console.log(`server running on port ${PORT}`))

// handle new socket connection from client
io.on('connection', socket => {
    console.log('New WS connection')
})