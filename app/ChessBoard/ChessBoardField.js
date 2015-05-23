var _ = require('lodash');

var ChessBoardField = function (board, row, col, chessPiece) {
  this.board = board;
  this.row = row;
  this.col = col;
  this.chessPiece = chessPiece;
};

ChessBoardField.prototype = {
  isEmpty: function () {
    return !this.chessPiece;
  },

  /**
   * Field is occupied by given chessPiece
   * @param chessPiece
   * @return {ChessBoardField}
   */
  occupyBy: function (chessPiece) {
    //if there is chess piece on that field beat it
    if(this.chessPiece) {
      _.pull(this.board.getPiecesForSet(this.chessPiece.set), this.chessPiece);
    }

    this.chessPiece = chessPiece;
    this.chessPiece.field = this;
    return this;
  },

  getChessPiece: function () {
    return this.chessPiece;
  },

  selectAbove: function () {
    return this.board.select(this.row + 1, this.col);
  },

  selectBelow: function () {
    return this.board.select(this.row - 1, this.col);
  },

  selectLeft: function () {
    return this.board.select(this.row, this.col - 1);
  },

  selectRight: function () {
    return this.board.select(this.row, this.col + 1);
  },

  selectUpperRight: function () {
    return this.board.select(this.row + 1, this.col + 1);
  },

  selectUpperLeft: function () {
    return this.board.select(this.row + 1, this.col - 1);
  },

  selectLowerRight: function () {
    return this.board.select(this.row - 1, this.col + 1);
  },

  selectLowerLeft: function () {
    return this.board.select(this.row - 1, this.col - 1);
  },

  /**
   * selects field below or above based on chess piece set (useful for implementing pawn moves)
   */
  selectAhead: function (set) {
    if (set.isWhite()) {
      return this.selectAbove();
    } else {
      return this.selectBelow();
    }
  },

  toSimpleField: function () {
    return {row: this.row, col: this.col};
  },

  clone: function (newBoard) {
    var clonedBoard = new ChessBoardField(newBoard, this.row, this.col);
    if (this.isEmpty())
      return clonedBoard;

    var clonedChessPiece = this.chessPiece.clone(this);
    clonedBoard.occupyBy(clonedChessPiece);
    return clonedBoard;
  },

  clear: function () {
    var chessPiece = this.chessPiece;
    this.chessPiece = undefined;

    return chessPiece;
  }
};

module.exports = ChessBoardField;