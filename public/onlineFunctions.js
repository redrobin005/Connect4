function sendName(){
    if (playerNumSess === 0) {
        let playerOne = getFromStorage('playerOne', 'Aristotle')
        socket.emit('player-name', playerOne)
    }else{
        let playerTwo = getFromStorage('playerTwo', 'Plato')
        socket.emit('player-name', playerTwo)
    }
}
socket.on('player-name', playerName =>{
    console.log('received name of other player', playerName)
    if (playerNumSess === 0) {
        sessionStorage.setItem('playerTwo', playerName)
    }else{
        sessionStorage.setItem('playerOne', playerName)
    }
    turnAssign(0)
})

function initialisePlayerTwo(){
    if (playerNumSess === 1){
        let turnWait = document.querySelector('#turnWait')
        turnWait.style.display = 'block'
        freezeBoard()
    }
}

function freezeBoard(){
    const gridElem = document.querySelector('#grid')
    gridElem.style.pointerEvents = "none"
}
function unfreezeBoard(){
    const gridElem = document.querySelector('#grid')
    gridElem.style.pointerEvents = "auto"
}

function sendMoveOnline(colNum){
    socket.emit('col-num', colNum)
    socket.emit('turn-count', turnCount)
}
socket.on('col-num', colNum =>{
    console.log('received colNum from other player', colNum)
    dropChip(colNum)
})
socket.on('turn-count', turnCnt =>{
    console.log('received turn from other player', turnCnt)
    turnCount = turnCnt
    switchOnlinePlayer()
})

function switchOnlinePlayer(){
    console.log('turn count is',turnCount)
    let turnWait = document.querySelector('#turnWait')
    if (turnCount % 2 === 0) {
        if (playerNumSess === 0) {
            turnWait.style.display = 'none'
            turnAssign(turnCount)
            unfreezeBoard()
        }else{
            turnWait.style.display = 'block'
            freezeBoard()
        }
    }else{
        console.log('player num is', playerNumSess)
        if (playerNumSess === 1) {
            turnWait.style.display = 'none'
            turnAssign(turnCount)
            unfreezeBoard()
        }else{
            turnWait.style.display = 'block'
            freezeBoard()
        }
    }
}