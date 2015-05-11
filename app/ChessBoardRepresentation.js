var chessPieciesFactory = require('./ChessPiecesFactory')();

var BOARD_SIZE = 8;

var ChessBoardRepresentation = function (otherBoard) {
  if (otherBoard) {
    this.board = otherBoard.board;
    return;
  }

  this.board = [];
  for (var i = 0; i < 8; i++) {
    this.board[i] = [];
    for (var j = 0; j < 8; j++) {
      this.board[i][j] = chessPieciesFactory.makeEmpty();
    }
  }
};

ChessBoardRepresentation.prototype.populate = function () {
  for (var i = 0; i < BOARD_SIZE; i++) {
    this.board[1][i] = chessPieciesFactory.makePawn();
  }
  this.board[0][0] = chessPieciesFactory.makeRook();
  this.board[0][1] = chessPieciesFactory.makeKnight();
  this.board[0][2] = chessPieciesFactory.makeBishop();
  this.board[0][3] = chessPieciesFactory.makeQueen();
  this.board[0][4] = chessPieciesFactory.makeKing();
  this.board[0][5] = chessPieciesFactory.makeBishop();
  this.board[0][6] = chessPieciesFactory.makeKnight();
  this.board[0][7] = chessPieciesFactory.makeRook();
};

ChessBoardRepresentation.prototype.toFenNotation = function () {
  var fenNotation;

  fenNotation = this.board.reduceRight(function(acc, line) {
    return acc + line.reduce(function(acc, piece) {
      return acc + piece.toFenNotation();
    }, "");
  }, "");

  return fenNotation;
};

module.exports = ChessBoardRepresentation;