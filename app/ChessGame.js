var ChessBoardRepresentation = require('./ChessBoard/ChessBoardRepresentation');

var ChessGame = function() {
  this.board = ChessBoardRepresentation.startingPopulation();
};

ChessGame.prototype =  {
  isMoveValid: function(move) {
    var selectedPiece = this.board.select(move.source).getChessPiece();
    var isValid = selectedPiece.canMove(move.target);

    if (isValid) {
      var nextState = this.board.makeMove(move);
      return !nextState.isCheck(selectedPiece.set);
    }
    return isValid;
  },

  registerMove: function (move) {
    if (!this.isMoveValid(move))
      return null;

    this.board = this.board.makeMove(move);
  },

  getGameState: function() {
    return this.board.toFenNotation();
  }
};

module.exports = ChessGame;