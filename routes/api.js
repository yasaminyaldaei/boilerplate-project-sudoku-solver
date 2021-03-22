'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function(app) {

  let solver = new SudokuSolver();
  const notValidPuzzle = /[^\.\d]/
  const notValidCoordinate = /[^A-I1-9]/
  const notValidValue = /[^1-9]/

  app.route('/api/check')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      const coordinate = req.body.coordinate;
      const value = req.body.value;

      if (!puzzle || !coordinate || !value) {
        return res.json({ "error": "Required field(s) missing" })
      }
      if (notValidPuzzle.test(puzzle)) return res.json({ "error": "Invalid characters in puzzle" })
      if (puzzle.length !== 81) return res.json({ "error": "Expected puzzle to be 81 characters long" })
      if (notValidCoordinate.test(coordinate)) return res.json({ "error": "Invalid coordinate" })
      if (notValidValue.test(value)) return res.json({ "error": "Invalid value" }) 
      const conflict = [];
      const isRowValid = solver.checkRowPlacement(puzzle, coordinate[0], coordinate[1], value);
      if (!isRowValid) {
        conflict.push("row")
      }
      const isColValid = solver.checkColPlacement(puzzle, coordinate[0], coordinate[1], value);
      if (!isColValid) {
        conflict.push("column")
      }
      const isRegValid = solver.checkRegionPlacement(puzzle, coordinate[0], coordinate[1], value);
      if (!isRegValid) {
        conflict.push("region")
      }
      const isValid = isRowValid && isColValid && isRegValid;


      return isValid ? res.json({
        "valid": isValid,
      }) :
      res.json({
        "valid": isValid,
        "conflict": conflict
      })   
    });

  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      if (!puzzle) return res.json({ "error": "Required field missing" })
      if (notValidPuzzle.test(puzzle)) return res.json({ "error": "Invalid characters in puzzle" })
      if (puzzle.length !== 81) return res.json({ "error": "Expected puzzle to be 81 characters long" })
    });
};
