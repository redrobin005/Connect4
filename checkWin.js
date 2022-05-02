function checkWinner(currVal, currRow, currCol){
    let winner = currVal === 'r' ? 'Red' : 'Yellow'

    if(
        horizontalWin(currVal, currRow, currCol) ||
        verticalWin(currVal, currRow, currCol)
    ){
        alert(`Winner is ${winner} !!!`)
    }

    return null;
}

function horizontalWin(currVal, currRow, currCol){
    const maxPoint = grid[currRow].length
    const minPoint = 0 
    let r = 0
    let l = 0

    for (let i = currCol; i < maxPoint; i++) {
        let val = grid[currRow][i]
        if(currVal === val){
            ++r
        }else{
            break
        }
    }
    for (let i = currCol; i => minPoint; i--) {
        let val = grid[currRow][i]
        if(currVal === val){
            ++l
        }else{
            break
        }
    }

    return (r + l - 1) === 4 ? true : false
}

function verticalWin(currVal, currRow, currCol){
    const minPoint = 0 
    let d = 0

    for (let i = currRow; i >= minPoint; i--) {
        let val = grid[i][currCol]
        if(currVal === val){
            ++d
        }else{
            break
        }
    }

    return d === 4 ? true : false
}