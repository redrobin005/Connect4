const {checkWinner, horizontalWin, verticalWin, posDiagonalWin, negDiagonalWin} = require('./checkWin.js')

function drawBoard(rowSize, colSize){
    grid = Array(rowSize).fill(null).map(() => Array(colSize).fill(null))
    //console.log(grid)
    return grid
}

function drawBoardHTML(rowSize, colSize, gridHTML){
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
    return gridHTML
}

function columnClick(){
    const cells = document.querySelectorAll('.cell')
    cells.forEach(function(elem) {
        let colNum = elem.parentElement.getAttribute("col-num")
        colNum = parseInt(colNum)
        elem.addEventListener("click", () => takeTurn(colNum));
    });
}

function dropChip(colNum, gridHTML){
    let colElement = gridHTML.querySelectorAll(`[col-num="${colNum}"]`)[0]
    for (let i = 0; i <  grid.length; i++) {
        const elem = grid[i][colNum]
        if (elem === null) {
            let cellElement = colElement.querySelectorAll(`[row-num="${i}"]`)[0]
            if (turnCount % 2 === 0) {
                grid[i][colNum] = 'r'
                cellElement.style.backgroundColor  = '#ff6961'
                checkWinner('r', i, colNum)
                return grid
            }else{
                grid[i][colNum] = 'y'
                cellElement.style.backgroundColor  = '#fdfd96'
                checkWinner('y', i, colNum)
                return grid
            }  
        }
    }
    return null
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

function randomMove(gridElem){
    gridElem.style.pointerEvents = "none"
    setTimeout(() => {
        const maxCol = grid[0].length
        const randCol = Math.floor(Math.random() * maxCol)
        takeTurn(randCol)
        gridElem.style.pointerEvents = "auto"
      }, 1000);
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

module.exports = {
    drawBoard,
    drawBoardHTML,
    columnClick,
    dropChip,
    turnAssign,
}