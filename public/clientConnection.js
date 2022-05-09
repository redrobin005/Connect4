let currentPlayer = "user"
let playerNum = 0
let ready = false
let enemyReady = false

const socket = io()

// get player num (which was emitted in server.js)
socket.on('player-number', num => {
    infoDisplay = document.querySelector('#infoDisplay')
    if (num === -1) {
        infoDisplay.innerHTML = "Sorry server is full"
    }else{
        playerNum = parseInt(num)
        if (playerNum === 1) currentPlayer = "enemy"

        console.log('player num', playerNum)
        // playerConnectedOrDisconnected(playerNum)
    }

})

// another player has connected/disconnected (on player 2 connection)
socket.on('player-connection', num =>{
    console.log(`Player ${num} has connected or disconnected`)
})