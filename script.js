window.onload = function(){
    columnClick()
}

function columnClick(){
    const cols = document.querySelectorAll('.col')
    cols.forEach(function(elem) {
        elem.addEventListener("click", dropChip);
    });
}

function dropChip(){
    const colNum = this.getAttribute("col-num")
    console.log(colNum)
}