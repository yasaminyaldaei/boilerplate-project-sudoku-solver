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

  rowIndexesGenerator(row) {
    return INDEX_HELPER.map((_, index) => (LENGTH * row) + index)
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowIndex = row.charCodeAt(0) - 97;
    const rowIndexes = this.rowIndexesGenerator(rowIndex);
    return rowIndexes.findIndex(index => puzzleString.charAt(index) == value)
  }

  colIndexesGenerator(col) {
    return INDEX_HELPER.map((_, index) => LENGTH * index + col);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const colIndexes = this.colIndexesGenerator(column);
    return colIndexes.findIndex((index) => puzzleString.charAt(index) == value);
  }

  regionIndexesGenerator(row, col) {
    const regionConstant = REGION_HELPER[`[${row / 3},${col / 3}]`];
    return INDEX_HELPER.map(
      (_, index) => (index % 3) + 3 * regionConstant + 9 * parseInt(index / 3)
    );
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const rowIndex = row.charCodeAt(0) - 97;
    const regionIndexes = this.regionIndexesGenerator(rowIndex, column)
    return regionIndexes.findIndex((index) => puzzleString.charAt(index) == value)
  }

  solve(puzzleString) {

  }
}

module.exports = SudokuSolver;

