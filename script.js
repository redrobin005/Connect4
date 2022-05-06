window.onload = function(){
    drawBoard()
    columnClick()
    turnAssign(0)
    setScore()
}
const randomAI = JSON.parse(getFromStorage('randomAI', false))
let grid

function drawBoard(){
    rowSize = JSON.parse(getFromStorage('rowSize', 6));
    colSize = JSON.parse(getFromStorage('colSize', 7));
    grid = Array(rowSize).fill(null).map(() => Array(colSize).fill(null))
    console.log(grid)
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
        elem.addEventListener("click", () => dropChip(colNum));
    });
}

let turnCount = 0
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
    ++turnCount;
    turnAssign(turnCount)
    if(randomAI && turnCount % 2 !== 0){randomMove()}
    console.log(grid)
}

function randomMove(){
    const gridElem = document.querySelector('#grid')
    gridElem.style.pointerEvents = "none"
    setTimeout(() => {
        const maxCol = grid[0].length
        const randCol = Math.floor(Math.random() * maxCol)
        dropChip(randCol)
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

