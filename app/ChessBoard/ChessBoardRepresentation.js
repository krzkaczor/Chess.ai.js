var _ = require('lodash');
var CHESS_CFG = require('../ChessConfig');
var ChessBoardField = require('./ChessBoardField');
var chessPieciesFactory = require('./../ChessPiecesFactory')();
var ChessSet = require('../ChessSet');

var CHESS_BOARD_ID = 0; //useful for debug

var ChessBoardRepresentation = function () {
  this.CHESS_BOARD_ID = CHESS_BOARD_ID++;

  this.whitePieces = [];
  this.blackPieces = [];

  this.board = [];
  for (var i = 0; i < 8; i++) {
    this.board[i] = [];
    for (var j = 0; j < 8; j++) {
      this.board[i][j] = new ChessBoardField(this, i, j);
    }
  }
};

/**
 * Generates chessboard with standard starting population
 * @returns {ChessBoardRepresentation}
 */
ChessBoardRepresentation.startingPopulation = function () {
  var boardObj = new ChessBoardRepresentation();
  var i = 0;
  for (i = 0; i < CHESS_CFG.BOARD_SIZE; i++) {
    boardObj.board[1][i].occupyBy(boardObj.register(new chessPieciesFactory.Pawn(ChessSet.white)));
  }
  boardObj.board[0][0].occupyBy(boardObj.register(new chessPieciesFactory.Rook(ChessSet.white)));
  boardObj.board[0][1].occupyBy(boardObj.register(new chessPieciesFactory.Knight(ChessSet.white)));
  boardObj.board[0][2].occupyBy(boardObj.register(new chessPieciesFactory.Bishop(ChessSet.white)));
  boardObj.board[0][3].occupyBy(boardObj.register(new chessPieciesFactory.Queen(ChessSet.white)));
  boardObj.board[0][4].occupyBy(boardObj.register(new chessPieciesFactory.King(ChessSet.white)));
  boardObj.board[0][5].occupyBy(boardObj.register(new chessPieciesFactory.Bishop(ChessSet.white)));
  boardObj.board[0][6].occupyBy(boardObj.register(new chessPieciesFactory.Knight(ChessSet.white)));
  boardObj.board[0][7].occupyBy(boardObj.register(new chessPieciesFactory.Rook(ChessSet.white)));

  for (i = 0; i < CHESS_CFG.BOARD_SIZE; i++) {
    boardObj.board[CHESS_CFG.BOARD_SIZE - 2][i].occupyBy(boardObj.register(new chessPieciesFactory.Pawn(ChessSet.black)));
  }
  boardObj.board[CHESS_CFG.BOARD_SIZE - 1][0].occupyBy(boardObj.register(new chessPieciesFactory.Rook(ChessSet.black)));
  boardObj.board[CHESS_CFG.BOARD_SIZE - 1][1].occupyBy(boardObj.register(new chessPieciesFactory.Knight(ChessSet.black)));
  boardObj.board[CHESS_CFG.BOARD_SIZE - 1][2].occupyBy(boardObj.register(new chessPieciesFactory.Bishop(ChessSet.black)));
  boardObj.board[CHESS_CFG.BOARD_SIZE - 1][3].occupyBy(boardObj.register(new chessPieciesFactory.Queen(ChessSet.black)));
  boardObj.board[CHESS_CFG.BOARD_SIZE - 1][4].occupyBy(boardObj.register(new chessPieciesFactory.King(ChessSet.black)));
  boardObj.board[CHESS_CFG.BOARD_SIZE - 1][5].occupyBy(boardObj.register(new chessPieciesFactory.Bishop(ChessSet.black)));
  boardObj.board[CHESS_CFG.BOARD_SIZE - 1][6].occupyBy(boardObj.register(new chessPieciesFactory.Knight(ChessSet.black)));
  boardObj.board[CHESS_CFG.BOARD_SIZE - 1][7].occupyBy(boardObj.register(new chessPieciesFactory.Rook(ChessSet.black)));

  return boardObj;
};

ChessBoardRepresentation.prototype = {
  /**
   * Performs deep copy
   */
  deepCopy: function() {
    var other = new ChessBoardRepresentation();
    
    other.board = _.cloneDeep(this.board, function (value) {
      if (value instanceof ChessBoardField) {
        var clonedField = value.clone(other);
        if (clonedField.chessPiece) {
          other.register(clonedField.chessPiece);
        }
        return clonedField;
      }
    }, other);

    return other;
  },
  /**
   * Returns board's Forsyth–Edwards Notation
   * @returns {string}
   */
  toFenNotation: function () {
    var fenNotation;

    fenNotation = this.board.reduceRight(function (acc, line) {
      var emptyFieldsCounter = 0;
      return acc + line.reduce(function (acc, field, i) {
            var fen = '';
            if (field.isEmpty()) {
              emptyFieldsCounter++;
              if (i == CHESS_CFG.BOARD_SIZE - 1) {
                fen = emptyFieldsCounter;
                emptyFieldsCounter = 0;
              }
            } else {
              fen = field.getChessPiece().toFenNotation();
              if (emptyFieldsCounter > 0) {
                fen = emptyFieldsCounter + fen;
              }
              emptyFieldsCounter = 0;
            }
            return acc + fen;
          }, "") + "/";
    }, "");

    return fenNotation.slice(0, -1);
  },


  /** //todo fix jdocs
   * Selects field on board
   * @param field {object} - simplified field description
   * @param field.row
   * @param field.col
   * @returns {object}
   */
  select: function () {
    var args = Array.prototype.slice.call(arguments);
    var row, col;
    if (args.length == 2) {
      row = args[0];
      col = args[1];
    } else {
      row = args[0].row;
      col = args[0].col;
    }

    if (row < 0 || row >= CHESS_CFG.BOARD_SIZE || col < 0 || col >= CHESS_CFG.BOARD_SIZE)
      return undefined;

    return this.board[row][col];
  },

  /**
   * Every chess piece placed on chess board should be registered
   * @param chessPiece {ChessPiece}
   * @return {ChessPiece}this.register(
   */
  register: function(chessPiece) {
    if (chessPiece.set.isWhite()) {
      this.whitePieces.push(chessPiece);
    } else {
      this.blackPieces.push(chessPiece);
    }
    return chessPiece;
  },

  /**
   * Performs move
   * @param move.source {object} - object representation source field
   * @param move.target {object} - object representation target field
   */
  makeMove: function (move) {
    var newChessBoard = this.deepCopy();
    var sourceField = newChessBoard.select(move.source);
    var targetField = newChessBoard.select(move.target);
    targetField.occupyBy(sourceField.clear());
    return newChessBoard;
  }
};

module.exports = ChessBoardRepresentation;