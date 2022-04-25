window.onload = function(){
    columnClick()
}

function columnClick(){
    const cells = document.querySelectorAll('.cell')
    cells.forEach(function(elem) {
        elem.addEventListener("click", dropChip);
    });
}

let grid = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
]

let turnCount = 0
function dropChip(){
    let colNum = this.parentElement.getAttribute("col-num")
    colNum = parseInt(colNum)
    if (grid[colNum].length < 6) {
        if (turnCount % 2 === 0) {
            grid[colNum].push('r')
        }else{
            grid[colNum].push('y')
        }  
    }
    ++turnCount;
    drawBoard()
}

function drawBoard(){
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let colElement = document.querySelectorAll(`[col-num="${i}"]`)[0]
            let cellElement = colElement.querySelectorAll(`[row-num="${j}"]`)[0]
            if (grid[i][j] === 'r') {
                cellElement.style.backgroundColor  = 'red'
            }else{
                cellElement.style.backgroundColor  = 'yellow'
            }
        }
    }
}
