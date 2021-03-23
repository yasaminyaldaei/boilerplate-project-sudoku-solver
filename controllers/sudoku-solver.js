const LENGTH = 9;
const INDEX_HELPER = new Array(LENGTH).fill(1);
const REGION_HELPER = {
  "[0,0]": 0,
  "[0,1]": 1,
  "[0,2]": 2,
  "[1,0]": 9,
  "[1,1]": 10,
  "[1,2]": 11,
  "[2,0]": 18,
  "[2,1]": 19,
  "[2,2]": 20,
};

class SudokuSolver {

  validate(puzzleString) {
  }

  checkCellPlacement(puzzleString, row, column, value) {
    const rowIndex = row.toLowerCase().charCodeAt(0) - 97;
    const colIndex = +column - 1;

    const cellIndex = 9 * rowIndex + colIndex;

    return puzzleString[cellIndex] == value;
  }

  rowIndexesGenerator(row) {
    return INDEX_HELPER.map((_, index) => (LENGTH * row) + index)
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowIndex = row.toLowerCase().charCodeAt(0) - 97;
    const rowIndexes = this.rowIndexesGenerator(rowIndex);
    return rowIndexes.findIndex(index => puzzleString.charAt(index) == value) === -1;
  }

  colIndexesGenerator(col) {
    return INDEX_HELPER.map((_, index) => LENGTH * index + col);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const colIndexes = this.colIndexesGenerator(+column - 1)
    return colIndexes.findIndex((index) => puzzleString.charAt(index) == value) === -1;
  }

  regionIndexesGenerator(row, col) {
    const regionConstant = REGION_HELPER[`[${parseInt(row / 3)},${parseInt(col / 3)}]`];
    return INDEX_HELPER.map(
      (_, index) => (index % 3) + 3 * regionConstant + 9 * parseInt(index / 3)
    );
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const rowIndex = row.toLowerCase().charCodeAt(0) - 97;
    const regionIndexes = this.regionIndexesGenerator(rowIndex, +column - 1)
    return regionIndexes.findIndex((index) => puzzleString.charAt(index) == value) === -1
  }

  solve(puzzleString) {
    const puzzleArray = puzzleString.split("")
    let solution = []

    for (let i = 0; i < puzzleArray.length; i++) {
      if (puzzleArray[i] === '.') {
        for (let j = 1; j <= 9; j++) {
          const coordinate = String.fromCharCode(65 + parseInt(i / 9)) + (parseInt(i % 9) + 1)

          const isRowValid = this.checkRowPlacement(puzzleString, coordinate[0], coordinate[1], j);
          const isColValid = this.checkColPlacement(puzzleString, coordinate[0], coordinate[1], j);
          const isRegValid = this.checkRegionPlacement(puzzleString, coordinate[0], coordinate[1], j);

          if (isRegValid && isColValid && isRowValid) {
            solution[i] = j
            break;
          }
        }
      } else {
        solution[i] = puzzleArray[i]
      }
    }

    return solution.join("")
  }
}

module.exports = SudokuSolver;

