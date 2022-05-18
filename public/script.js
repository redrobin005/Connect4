const {checkWinner, horizontalWin, verticalWin, posDiagonalWin, negDiagonalWin, setScore} = require('./checkWin.js')
const {drawBoard, drawBoardHTML, columnClick, dropChip, turnAssign} = require('./mainFunctions.js')

const rowSize = JSON.parse(getFromStorage('rowSize', 6));
const colSize = JSON.parse(getFromStorage('colSize', 7));
const randomAI = JSON.parse(getFromStorage('randomAI', false))
const onlineGame = JSON.parse(getFromStorage('onlineGame', false))
let playerNumSess = JSON.parse(sessionStorage.getItem('playerNum'));
let grid
let turnCount = 0
const gridHTML = document.querySelector('#grid')

window.onload = function(){
    grid = drawBoard(rowSize, colSize)
    drawBoardHTML(rowSize, colSize, gridHTML)
    columnClick()
    turnAssign(0)
    setScore()

    if (onlineGame){
        sendName()
        initialisePlayerTwo()
    } 
}

