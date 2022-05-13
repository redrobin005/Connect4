window.onload = function(){
    drawBoard()
    columnClick()
    turnAssign(0)
    setScore()

    if (onlineGame){
        sendName()
        initialisePlayerTwo()
    } 
}
const randomAI = JSON.parse(getFromStorage('randomAI', false))
const onlineGame = JSON.parse(getFromStorage('onlineGame', false))
let playerNumSess = JSON.parse(sessionStorage.getItem('playerNum'));
let grid
let turnCount = 0

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

function drawBoard(){
    rowSize = JSON.parse(getFromStorage('rowSize', 6));
    colSize = JSON.parse(getFromStorage('colSize', 7));
    grid = Array(rowSize).fill(null).map(() => Array(colSize).fill(null))
    //console.log(grid)
    drawBoardHTML(rowSize, colSize)
}

function drawBoardHTML(rowSize, colSize){
    const gridHTML = document.querySelector('#grid')
    for (let i = 0; i < colSize; i++) {
        let colHTML = document.createElement('div')
        colHTML.setAttribute('class', 'col')
        colHTML.setAttribute('col-num', `${i}`)
        gridHTML.append(colHTML)
        for (let j = 0; j < rowSize; j++) {
            let cellHTML = document.createElement('div')
            cellHTML.setAttribute('class', 'cell')
            cellHTML.setAttribute('row-num', `${j}`)
            colHTML.prepend(cellHTML)
        }

    }
}

function columnClick(){
    const cells = document.querySelectorAll('.cell')
    cells.forEach(function(elem) {
        let colNum = elem.parentElement.getAttribute("col-num")
        colNum = parseInt(colNum)
        elem.addEventListener("click", () => takeTurn(colNum));
    });
}

function takeTurn(colNum){
    dropChip(colNum)
    ++turnCount;
    turnAssign(turnCount)
    if(randomAI && turnCount % 2 !== 0){randomMove()}
    if(onlineGame){
       sendMoveOnline(colNum)
       switchOnlinePlayer()
    }
}

function dropChip(colNum){
    for (let i = 0; i <  grid.length; i++) {
        const elem = grid[i][colNum]
        if (elem === null) {
            let colElement = document.querySelectorAll(`[col-num="${colNum}"]`)[0]
            let cellElement = colElement.querySelectorAll(`[row-num="${i}"]`)[0]
            if (turnCount % 2 === 0) {
                grid[i][colNum] = 'r'
                cellElement.style.backgroundColor  = '#ff6961'
                checkWinner('r', i, colNum)
                break
            }else{
                grid[i][colNum] = 'y'
                cellElement.style.backgroundColor  = '#fdfd96'
                checkWinner('y', i, colNum)
                break
            }  
        }
    }
}

function randomMove(){
    const gridElem = document.querySelector('#grid')
    gridElem.style.pointerEvents = "none"
    setTimeout(() => {
        const maxCol = grid[0].length
        const randCol = Math.floor(Math.random() * maxCol)
        takeTurn(randCol)
        gridElem.style.pointerEvents = "auto"
      }, 1000);
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

function turnAssign(turnCount){
    let playerOne = getFromStorage('playerOne', 'Aristotle')
    let playerTwo = getFromStorage('playerTwo', 'Plato')
    let player = turnCount % 2 === 0 ? playerOne : playerTwo
    let turnElem = document.querySelector('#turnDisplay')
    turnElem.innerText = `Turn: ${player}`
    turnColour(turnElem)
    
}

function turnColour(turnElem){
    let colour = turnCount % 2 === 0 ? '#ff6961' : '#fdfd96'
    let badge = document.createElement('span')
    badge.setAttribute('class', 'badge')
    badge.setAttribute('id', 'turnColour')
    badge.innerText = ' '
    badge.style.backgroundColor = colour
    badge.style.marginRight = '10px'
    turnElem.prepend(badge)
}

function getFromStorage(name, alt){
    let item = sessionStorage.getItem(name);
    return item = item ? item : alt
}

