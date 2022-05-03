function sizeBoard(){
    let rowSize = parseInt(document.querySelector('#rowSize').value)
    let colSize = parseInt(document.querySelector('#colSize').value) 
    sessionStorage.setItem('rowSize', JSON.stringify(rowSize))
    sessionStorage.setItem('colSize', JSON.stringify(colSize))
    window.location.href = "index.html"
}