let currentPlayer = "user"
let playerNum = 0
let ready = false
let readyButton = document.querySelector('#readyButton')
let enemyReady = false

const socket = io()

// get player num of connected socket (which was emitted in server.js)
socket.on('player-number', num => {
    infoDisplay = document.querySelector('#infoDisplay')
    if (num === -1) {
        infoDisplay.innerHTML = "Sorry server is full"
    }else{
        playerNum = parseInt(num)
        disableNameInput()
        if (playerNum === 1) currentPlayer = "enemy"

        // console.log('player num', playerNum)

        // check if player 1 is ready before player 2 even connects
        // get other player status
        socket.emit('check-players')
    }

})

// another player has connected/disconnected
// because this player-connection message is sent from server via broadcast.emit, 
// only other sockets, not the current socket will execute the following 
socket.on('player-connection', num =>{
    console.log(`Player ${num} has connected or disconnected`)
    playerConnectedOrDisconnected(num)
})

function playerConnectedOrDisconnected(num){
    let player = num === 0 ? '#playerOneConn' : '#playerTwoConn'
    if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === "optionsOnline.html") {
        let playerStatus = document.querySelector(player)
        playerStatus.style.backgroundColor = 'green'
    }
}


if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === "optionsOnline.html") {
    readyButton.addEventListener('click', () =>{
        playGame(socket)
    })
}

function disableNameInput(){
    if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === "optionsOnline.html") {
        if (playerNum === 0) {
            let playerTwo = document.querySelector('#playerTwo')
            playerTwo.disabled = true
        }else{
            let playerOne = document.querySelector('#playerOne')
            playerOne.disabled = true
            
        }
    }
}

function setNames(){
    if (playerNum === 0) {
        let playerOne = document.querySelector('#playerOne').value
        sessionStorage.setItem('playerOne', playerOne)
    }else{
        let playerTwo = document.querySelector('#playerTwo').value
        sessionStorage.setItem('playerTwo', playerTwo)
    }
}

function playGame(socket){
    // send message saying the player on this socket is ready 
    if(!ready){
        socket.emit('player-ready')
        ready = true 
        playerReady(playerNum)
    }

    // if both player 0 and player 1 click ready. continue to index.html
    if(enemyReady){
        sessionStorage.setItem('randomAI', false)
        sessionStorage.setItem('onlineGame', true)
        sessionStorage.setItem('playerNum', playerNum)
        setNames()
        window.location.href = "index.html"
    }
}

function playerReady(num){
    let player = parseInt(num) === 0 ? '#playerOneReady' : '#playerTwoReady'
    if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === "optionsOnline.html") {
        let playerStatus = document.querySelector(player)
        playerStatus.style.backgroundColor = 'green'
    }
}

// on enemy ready (sent from other client to server to this client)
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