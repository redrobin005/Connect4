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

    // broadcast.emit only sends to clients that are not the current connection socket
    // when player 1 connects, player 0 gets this message
    socket.broadcast.emit('player-connection', playerIndex)
    
    //handle disconnect
    socket.on('disconnect', () =>{
        console.log(`Player ${playerIndex} has disconnected`)
        connections[playerIndex] = null
        // tell other client what player just disconnected
        socket.broadcast.emit('player-connection', playerIndex)
    })

    // on ready
    socket.on('player-ready', () => {
        // tells other client that their enemy is ready
        socket.broadcast.emit('enemy-ready', playerIndex)
        connections[playerIndex] = true
    })

    // check player connections
    socket.on('check-players', () =>{
        const players = []
        for (const i in connections){
            connections[i] === null ? players.push({connected: false, ready: false}):
            players.push({connected:true, ready: connections[i]})
        }
        socket.emit('check-players', players)
    })

    // on col num receival
    socket.on('col-num', colNum =>{
        console.log('Received following colNum', colNum)
        // send this grid to other player
        socket.broadcast.emit('col-num', colNum)
    })

    // on turnCount receival
    socket.on('turn-count', turnCnt =>{
        console.log('Received following turnCount', turnCnt)
        // send this grid to other player
        socket.broadcast.emit('turn-count', turnCnt)
    })

    // on name receival
    socket.on('player-name', playerName =>{
        console.log('Received following name', playerName)
        // send this name to other player
        socket.broadcast.emit('player-name', playerName)
    })
})