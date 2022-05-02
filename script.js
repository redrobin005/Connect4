window.onload = function(){
    columnClick()
}

let grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]

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
    console.log(grid)
}

