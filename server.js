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
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const connections = [null, null]
// handle new socket connection from client
io.on('connection', socket => {
    console.log('New WS connection')

    // find available player number connection (one that isn't null)
    let playerIndex = -1
    for(const i in connections){
        if(connections[i] === null){
            playerIndex = i
            break
        }
    }

    // tell (attempted) connecting client their player num
    socket.emit('player-number', playerIndex)
    console.log(`Player ${playerIndex} has connected`)

    // ignore player 3 and beyond
    if (playerIndex === -1) return

    // if player connected but not ready, then null to false
    connections[playerIndex] = false

    // tell everyone the player num that has actually connected
    socket.broadcast.emit('player-connection', playerIndex)
})