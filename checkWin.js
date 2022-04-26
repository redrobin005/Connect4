function checkWinner(){
    console.log("checkWinner was called");

    if (turns.length < 7) {
        return null
    }

    initialiseColourArrays()
    if(straightWin(redArray, "row") || straightWin(redArray, "column") || diagonalWin(redArray)){
        console.log('Red Win')
        alert('Red Win')
    }
    if(straightWin(yellowArray, "row") || straightWin(yellowArray, "column") || diagonalWin(yellowArray)){
        console.log('Yellow Win')
        alert('Yellow Win')
    }

    if (turns.length === 42) {
        console.log('Nobody wins')
    }

    return null;
}

let redArray = []
let yellowArray = []
function initialiseColourArrays(){
    redArray = []
    yellowArray = []
    for (let i = 0; i < turns.length; i++) {
        const turnColour = turns[i].colour
        if (turnColour === "red") {
            redArray.push(turns[i])
        }else if (turnColour === "yellow"){
            yellowArray.push(turns[i])
        }
    }
}

// straight win occurs if 4 chips in same col/row
// with the opposite col/row in 1 interval sequence
function straightWin(arr, rc){
    let fourChipRCArray = fourChips(arr,rc)
    if (fourChipRCArray) {
        for (let i = 0; i < fourChipRCArray.length; i++) {
            let oppositeRCArray = getOppositeRCArray(arr, rc, fourChipRCArray[i])
            if (checkSequence(oppositeRCArray)) {
                return true;
            }
        }
    }
    return false
}

// check if there if there's 4 reds or yellows in a row/col
// return these rows/cols
function fourChips(arr, rc){
    let countArray = []
    for (let i = 0; i < arr.length; i++) {
        countArray.push(arr[i][rc])
    }
    countArray.sort((a, b) => a - b)
    
    matchingRCArray = []
    let counter = 1
    for (let i = 1; i < countArray.length; i++) {
        if (countArray[i-1] === countArray[i]){
            ++counter
            if (counter === 4) {
                matchingRCArray.push(countArray[i])
            }
        }else{
            counter = 1
        }
        
    }
    if (matchingRCArray.length > 0) {
        return matchingRCArray
    }else{
        return null
    }
}

function getOppositeRCArray(arr, rc, rcNum){
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
    return oppositeRCArray
}

function checkSequence(arr){
    arr.sort((a, b) => a - b)
    let sequence = false
    let counter = 1
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i-1] + 1) {
            sequence = true
            ++counter
            if (counter === 4) {
                return true
            }
        }else{
            sequence = false
        }
    }
}

function diagonalWin(arr){
    return false
}