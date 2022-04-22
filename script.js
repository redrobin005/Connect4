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
    if (turnCount % 2 === 0) {
        grid[colNum].push('r')
    }else{
        grid[colNum].push('y')
    }
    ++turnCount;
    console.log(grid)
}
