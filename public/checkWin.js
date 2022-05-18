function checkWinner(currVal, currRow, currCol){
    if(
        horizontalWin(currVal, currRow, currCol) ||
        verticalWin(currVal, currRow, currCol) ||
        posDiagonalWin(currVal, currRow, currCol) ||
        negDiagonalWin(currVal, currRow, currCol)
    ){
        let playerOne = getFromStorage('playerOne', 'Will Smith')
        let playerTwo = getFromStorage('playerTwo', 'Chris Rock')
        let winner = currVal === 'r' ? playerOne : playerTwo

        displayWinModal(winner)
        incrementScore(currVal)
    }else{
        return null;
    }
}

function displayWinModal(winner){
    let modal = document.getElementById('myModal');
    modal.style.display = "block";
    let winnerName = document.getElementById('winnerName');
    winnerName.innerText = `Congratulations ${winner}!!!`
}

function incrementScore(winner){
    if(winner === 'r'){
        let score = parseInt(getFromStorage('playerOneScore', '0'))
        sessionStorage.setItem('playerOneScore', ++score)
    }else{
        let score = parseInt(getFromStorage('playerTwoScore', '0'))
        sessionStorage.setItem('playerTwoScore', ++score)
    }
}

function setScore(){
    let score1 = parseInt(getFromStorage('playerOneScore', '0'))
    let scoreElem1 = document.querySelector('#playerOneScore')
    scoreElem1.innerText = score1

    let score2 = parseInt(getFromStorage('playerTwoScore', '0'))
    let scoreElem2 = document.querySelector('#playerTwoScore')
    scoreElem2.innerText = score2
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


function posDiagonalWin(currVal, currRow, currCol){
    const rowLength = grid[currRow].length
    const colLength = grid[currRow][currCol].length
    const maxPoint = rowLength > colLength ? rowLength : colLength
    const minPoint = 0 
    let r = 0
    let l = 0

    let row = currRow
    let col = currCol
    while(row < maxPoint && col < maxPoint){
        let val = grid[row][col]
        if(currVal === val){
            ++r
        }else{
            break
        }
        ++row
        ++col
    }

    row = currRow
    col = currCol
    while(row >= minPoint && col >= minPoint){
        let val = grid[row][col]
        if(currVal === val){
            ++l
        }else{
            break
        }
        --row
        --col
    }

    return (r + l - 1) === 4 ? true : false
}

function negDiagonalWin(currVal, currRow, currCol){
    const rowLength = grid[currRow].length
    const colLength = grid[currRow][currCol].length
    const maxPoint = rowLength > colLength ? rowLength : colLength
    const minPoint = 0 
    let r = 0
    let l = 0

    let row = currRow
    let col = currCol
    while(row >= minPoint && col < maxPoint){
        let val = grid[row][col]
        if(currVal === val){
            ++r
        }else{
            break
        }
        --row
        ++col
    }

    row = currRow
    col = currCol
    while(row < maxPoint && col >= minPoint){
        let val = grid[row][col]
        if(currVal === val){
            ++l
        }else{
            break
        }
        ++row
        --col
    }

    return (r + l - 1) === 4 ? true : false
}

module.exports = {
    checkWinner,
    horizontalWin,
    verticalWin,
    posDiagonalWin,
    negDiagonalWin,
    setScore
}