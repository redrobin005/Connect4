function checkWinner(){
    console.log("checkWinner was called");

    if (turns.length < 7) {
        return null
    }
    initialiseColourArrays()
    if(straightWin(redArray, "row") || straightWin(redArray, "column") || diagonalWin1(redArray) ||  diagonalWin2(redArray)){
        alert('Red Win')
        //location.reload()
    }
    if(straightWin(yellowArray, "row") || straightWin(yellowArray, "column") || diagonalWin1(yellowArray) ||  diagonalWin2(yellowArray)){
        alert('Yellow Win')
        //location.reload()
    }
    if (turns.length === 42) {
        alert('Nobody wins')
        location.reload()
    }

    return null;
}

let redArray = []
let yellowArray = []
function initialiseColourArrays(){
    redArray = []
    yellowArray = []
    for (let i = 0; i < turns.length; i++) {
        let turnColour = turns[i].colour
    
        if (turnColour === "red") {
            redArray.push(turns[i])
        }else if (turnColour === "yellow"){
            yellowArray.push(turns[i])
        }
    }
}

function straightWin(arr, rc){
    let countArray = []
    for (let i = 0; i < arr.length; i++) {
        countArray.push(arr[i][rc])
    }
    countArray.sort((a, b) => a - b)
    
    let counter = 1
    for (let i = 0; i < countArray.length; i++) {
        if (i > 0 && countArray[i-1] === countArray[i]){
            ++counter
            if (counter === 4 && checkAdjacent(arr, rc, countArray[i])) {
                console.log(countArray)
                return true
            }
        }else{
            counter = 1
        }
        
    }
}

function checkAdjacent(arr, rc, rcNum){
    let oppositeRCArray = []
    if (rc === 'row') {
        arr.forEach(element => {
            if (element.row === rcNum) {
                oppositeRCArray.push(element.column)
            }
        });
    }else{
        arr.forEach(element => {
            if (element.column === rcNum) {
                oppositeRCArray.push(element.row)
            }
        });
    }

    oppositeRCArray.sort((a, b) => a - b)
    return checkSequence(oppositeRCArray)

}

function checkSequence(arr){
    let sequence = false
    let count = 1
    for (let i = 0; i < arr.length; i++) {
        if (i > 0) {
            if (arr[i] === arr[i-1] + 1) {
                sequence = true
                count++
            }else{
                sequence = false
                count = 1
            }
            if (sequence && count === 4) {
                return true
            }
        }
    }
}

function diagonalWin1(arr){
return false
}

function diagonalWin2(arr){
return false
}