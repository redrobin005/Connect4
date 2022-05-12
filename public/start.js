function setGame(randomAI){
    let rowSize = document.querySelector('#rowSize').value
    let colSize = document.querySelector('#colSize').value 
    let playerOne = document.querySelector('#playerOne').value
    let playerTwo = document.querySelector('#playerTwo').value

    sessionStorage.setItem('rowSize', rowSize)
    sessionStorage.setItem('colSize', colSize)
    sessionStorage.setItem('playerOne', playerOne)
    sessionStorage.setItem('playerTwo', playerTwo)
    
    sessionStorage.setItem('randomAI', randomAI)
    sessionStorage.setItem('onlineGame', false)

    sessionStorage.setItem('playerOneScore', 0)
    sessionStorage.setItem('playerTwoScore', 0)
    
    window.location.href = "index.html"
}