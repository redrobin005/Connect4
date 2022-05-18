const {checkWinner, horizontalWin, verticalWin, posDiagonalWin, negDiagonalWin} = require('./checkWin.js')

it("should return null with only one chip added", () => {
    // Arrange
    grid = [
        [null, null, null, null, null, null, 'r'], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
    ];

    const expectedOutput = null

    // Act
    const actualOutput =  checkWinner('r', 0, 6)

    // Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});

it("should return null if there are less than 4 chips of the same colour", () => {
    // Arrange
    grid = [
        [null, null, null, 'y', 'r', 'r', 'r'], 
        [null, null, null, 'y', null, null, null], 
        [null, null, null, 'y', null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
    ];

    const expectedOutput = null

    // Act
    const actualOutput =  checkWinner('r', 0, 6)

    // Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});

it("should return null if there aren't 4 consecutive chips of the same colour", () => {
    // Arrange
    grid = [
        [null, null, 'y', 'y', 'r', 'r', 'r'], 
        [null, null, null, 'y', null, null, null], 
        [null, null, null, 'y', null, null, null], 
        [null, null, null, 'r', null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
    ];

    const expectedOutput = null

    // Act
    const actualOutput =  checkWinner('r', 0, 3)

    // Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});

it("should return true when 4 of the same colour are placed horizontally", () => {
    // Arrange
    grid = [
        [null, null, null, 'r', 'r', 'r', 'r'], 
        [null, null, null, 'y', null, null, null], 
        [null, null, null, 'y', null, null, null], 
        [null, null, null, 'y', null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
    ];

    const expectedOutput = true

    // Act
    const actualOutput =  horizontalWin('r', 0, 6)

    // Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});

it("should return true when 4 of the same colour are placed vertically", () => {
    // Arrange
    grid = [
        [null, null, 'r', 'y', 'r', 'r', 'r'], 
        [null, null, null, 'y', null, null, null], 
        [null, null, null, 'y', null, null, null], 
        [null, null, null, 'y', null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
    ];

    const expectedOutput = true

    // Act
    const actualOutput =  verticalWin('y', 3, 3)

    // Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});

it("should return true when 4 of the same colour are placed in a positive diagonal", () => {
    // Arrange
    grid = [
        [null, null, 'r', 'y', 'y', 'y', 'r'], 
        [null, null, null, 'r', 'y', 'r', null], 
        [null, null, null, 'y', 'r', 'r', null], 
        [null, null, null, 'y', null, 'r', null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
    ];

    const expectedOutput = true

    // Act
    const actualOutput =  posDiagonalWin('r', 3, 5)

    // Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});

it("should return true when 4 of the same colour are placed in a negative diagonal", () => {
    // Arrange
    grid = [
        [null, null, 'r', 'y', 'r', 'y', null], 
        [null, null, 'r', 'y', 'y', 'r', null], 
        [null, null, 'r', 'y', 'y', 'r', null], 
        [null, null, 'y', 'r', 'r', null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
    ];

    const expectedOutput = true

    // Act
    const actualOutput =  negDiagonalWin('y', 3, 2)

    // Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});