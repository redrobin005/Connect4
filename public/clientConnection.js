let currentPlayer = "user"
let playerNum = 0
let ready = false
let readyButton = document.querySelector('#readyButton')
let enemyReady = false

const socket = io()

// get player num (which was emitted in server.js)
socket.on('player-number', num => {
    infoDisplay = document.querySelector('#infoDisplay')
    if (num === -1) {
        infoDisplay.innerHTML = "Sorry server is full"
    }else{
        playerNum = parseInt(num)
        // if (playerNum === 1) currentPlayer = "enemy"

        console.log('player num', playerNum)

        // check if player 1 is ready before player 2 even connects
        // get other player status
        socket.emit('check-players')
    }

})

// another player has connected/disconnected (on player 2 connection)
socket.on('player-connection', num =>{
    console.log(`Player ${num} has connected or disconnected`)
    playerConnectedOrDisconnected(num)
})

function playerConnectedOrDisconnected(num){
    let player = num === 0 ? '#playerOneConn' : '#playerTwoConn'
    let playerStatus = document.querySelector(player)
    playerStatus.style.backgroundColor = 'green'
}

readyButton.addEventListener('click', () =>{
    playGame(socket)
})

function playGame(socket){
    // send message saying the player on this socket is ready 
    if(!ready){
        socket.emit('player-ready')
        ready = true 
        playerReady(playerNum)
    }

    // if both player 0 and player 1 click ready. continue to index.html
    if(enemyReady){
        window.location.href = "index.html"
    }
}

function playerReady(num){
    let player = parseInt(num) === 0 ? '#playerOneReady' : '#playerTwoReady'
    let playerStatus = document.querySelector(player)
    playerStatus.style.backgroundColor = 'green'
}

// on enemy ready 
socket.on('enemy-ready', num => {
    enemyReady = true
    playerReady(num)
    if (ready) playGame(socket)
})

// check player status
socket.on('check-players', players => {
    players.forEach((p, i) => {
        if(p.connected) playerConnectedOrDisconnected(i)
        if(p.ready){
            playerReady(i)
            if(i !== playerNum) enemyReady = true
        }
    })
})