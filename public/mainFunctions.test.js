const {drawBoard, drawBoardHTML, columnClick, dropChip} = require('./mainFunctions.js')
const { JSDOM } = require("jsdom")
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

it("should draw a 2D array of the specified board size", () => {
    // Arrange
    grid = [
        [null, null, null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null, null], 
    ];

    const expectedOutput = grid

    // Act
    const actualOutput =  drawBoard(4, 9)

    // Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});

it("should create the HTML for the game board and append it to a root element", () => {
    // Arrange
    grid = drawBoard(4, 9)

    el = document.createElement('div')
    el.setAttribute("id","grid");

    const expectedOutput = 36

    // Act
    drawBoardHTML(4, 9, el)
    nodesSameClass = el.getElementsByClassName("cell");
    numNodes = nodesSameClass.length
    const actualOutput = numNodes


    // Assert
    expect(actualOutput).toEqual(expectedOutput);
});

it("should change the colour of first free row of the selected column to the appropriate colour", () => {
    // Arrange
    grid = [
        [null, null, 'r', null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null, null], 
    ];

    const expectedOutput = grid
    
    drawBoard(4, 9)
    el = document.createElement('div')
    el.setAttribute("id","grid");
    drawBoardHTML(4, 9, el)

    // Act
    turnCount = 0
    const actualOutput = dropChip(2, el)


    // Assert
    expect(actualOutput).toEqual(expectedOutput);
});