/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNSolutions = function(row, n, board, helper, cb) {
  if (row === n) {
    return cb();
  }
  // for each row in the board
  for (let col = 0; col < n; col++) {
    // if there is no conflict at current location (column x row)
    board.togglePiece(row, col);

    if (!board[helper]()) {
      findNSolutions(row + 1, n, board, helper, cb);
    }

    board.togglePiece(row, col);
  }
};

window.findNRooksSolution = function(n) {
  let solution = new Board({ 'n': n });
  // iterate over n - for each iteration
  for (let rowCol = 0; rowCol < n; rowCol++) {
    solution.togglePiece(rowCol, rowCol);
  }

  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionCount = 0;
  let board = new Board({ 'n': n });
  // helper function

  findNSolutions(0, n, board, 'hasAnyRooksConflicts', () => {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();
  findNSolutions(0, n, board, 'hasAnyQueensConflicts', function(board) {
    return solution = board.rows().map((row) => row.slice());
  });
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solutionCount = 0;
  let board = new Board({ 'n': n });
  // helper function

  findNSolutions(0, n, board, 'hasAnyQueensConflicts', () => {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
