window.onload = function(){
    drawBoard()
    columnClick()
    turnAssign(0)
}
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
    for (let i = 0; i < rowSize; i++) {
        let colHTML = document.createElement('div')
        colHTML.setAttribute('class', 'col')
        colHTML.setAttribute('col-num', `${i}`)
        gridHTML.append(colHTML)
        for (let j = 0; j < colSize; j++) {
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
        elem.addEventListener("click", dropChip);
    });
}

let turnCount = 0
function dropChip(){
    let colNum = this.parentElement.getAttribute("col-num")
    colNum = parseInt(colNum)
    for (let i = 0; i <  grid.length; i++) {
        const elem = grid[i][colNum]
        if (elem === null) {
            let colElement = document.querySelectorAll(`[col-num="${colNum}"]`)[0]
            let cellElement = colElement.querySelectorAll(`[row-num="${i}"]`)[0]
            if (turnCount % 2 === 0) {
                grid[i][colNum] = 'r'
                cellElement.style.backgroundColor  = 'red'
                checkWinner('r', i, colNum)
                break
            }else{
                grid[i][colNum] = 'y'
                cellElement.style.backgroundColor  = 'yellow'
                checkWinner('y', i, colNum)
                break
            }  
        }
    }
    ++turnCount;
    turnAssign(turnCount)
    console.log(grid)
}

function turnAssign(turnCount){
    let playerOne = getFromStorage('playerOne', 'Will Smith')
    let playerTwo = getFromStorage('playerTwo', 'Chris Rock')
    let player = turnCount % 2 === 0 ? playerOne : playerTwo
    let turnElem = document.querySelector('#turnDisplay')
    turnElem.innerText = `Your turn ${player}`
}

function getFromStorage(name, alt){
    let item = sessionStorage.getItem(name);
    return item = item ? item : alt
}

