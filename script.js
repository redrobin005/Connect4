window.onload = function(){
    columnClick()
}

function columnClick(){
    const cols = document.querySelectorAll('.col')
    cols.forEach(function(elem) {
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
]

let turnCount = 0
function dropChip(){
    let colNum = this.getAttribute("col-num")
    colNum = parseInt(colNum)
    --colNum;
    if (turnCount % 2 === 0) {
        grid[colNum].push('r')
    }else{
        grid[colNum].push('y')
    }
    ++turnCount;
    console.log(grid)
}