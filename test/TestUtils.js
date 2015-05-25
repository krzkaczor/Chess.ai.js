var ChessSet = require('../app/ChessSet');
var ChessBoardRepresentation = require('../app/Chessboard/ChessBoardRepresentation');
var ChessPiecesFactory = require('../app/ChessPiecesFactory')();

module.exports = {
  makeMove: function (row, col) {
    return {row: row, col: col};
  },
  moveToStringNotation: function (move) {
    function colToStr(col) {
      return String.fromCharCode(col + 'a'.charCodeAt(0));
    }

    return colToStr(move.col) + (move.row + 1);
  },
  /**
   * Move can have more properties than only row and col.
   * @param actual
   * @param expected
   * @returns {boolean}
   */
  checkMoves: function (actual, expected) {
    if (actual.length != expected.length)
      return false;

    for (var i = 0; i < actual.length; i++) {

      var searched = actual[i];
      var foundMatch = false;
      for (var j = 0; j < expected.length; j++) {
        var checked = expected[j];
        if (searched.row == checked.row && searched.col == checked.col) {
          foundMatch = true;
          break;
        }
      }
      if (!foundMatch) {
        return false;
      }
    }
    return true;
  },

  generateBasicGameState: function() {
    var board = new ChessBoardRepresentation();
    var whiteKing = new ChessPiecesFactory.King(ChessSet.white);
    var blackKing = new ChessPiecesFactory.King(ChessSet.black);

    board.select(0, 4).occupyBy(board.register(whiteKing));
    board.select(7, 4).occupyBy(board.register(blackKing));

    return board;
  }
};