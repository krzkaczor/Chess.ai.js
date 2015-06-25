var CHESS_CFG = require('./ChessConfig');
var _ = require('lodash');


var rangeSelector = function (initField, forwardFunction, accumulator) {
  var currentField = initField[forwardFunction]();
  while (currentField && currentField.isEmpty()) {
    accumulator.push(currentField);
    currentField = currentField[forwardFunction]();
  }
  if (currentField && currentField.chessPiece.set.isEnemyOf(initField.chessPiece.set)) {
    accumulator.push(currentField);
  }
};

var ChessPiece = function (name, fen) {
  this.name = name;
  this.fen = fen;
};

ChessPiece.prototype.clone = function (field) {
  return new this.constructor(this.set, field);
};

ChessPiece.prototype.toFenNotation = function () {
  return this.set.isBlack() ? this.fen : this.fen.toUpperCase();
};

/**
 * Checks if can move to given field
 * @param field {object}
 * @return boolean
 */
ChessPiece.prototype.canMove = function (field) {
  return !_.isEmpty(this.generateAllPossibleMoves().filter(function (move) {
    return move.row == field.row && move.col == field.col;
  }));
};

ChessPiece.prototype.generateAllPossibleMoves = function () {
  var moves = this._generateAllPossibleMoves();
  var field = this.field;
  var self = this;

  var validMoves = moves; //.filter(function(move) {
  //  return !field.board.makeMove({source: field.toSimpleField(), target: move}).isCheck(field.board.setInControl);
  //});

  //moves that capture enemy are first on list
  return _.sortBy(validMoves, function(moveTarget) {
    var moveTargetField = field.board.select(moveTarget);
    return !moveTargetField.isEmpty() && moveTarget.chessPiece.set.isEnemyOf(self.set)? 1 : 0;
  });
};

var Pawn = function (chessSet, field) {
  this.set = chessSet;
  this.field = field;
};
Pawn.prototype = new ChessPiece('pawn', 'p');
Pawn.prototype.constructor = Pawn;

Pawn.prototype._generateAllPossibleMoves = function () {
  var isWhite = this.set.isWhite();
  var notTouched = (isWhite && this.field.row == 1) || (!isWhite && this.field.row == CHESS_CFG.BOARD_SIZE - 2);

  var isEnemySet = function (set) {
    return set != this.set;
  }.bind(this);

  var possibleMoves = [];

  //pawn can:
  //1. Move one field ahead if it is empty
  var fieldAhead = this.field.selectAhead(this.set);
  if (fieldAhead && fieldAhead.isEmpty()) {
    possibleMoves.push(fieldAhead);
  }
  if (fieldAhead) {
    //2. Move two fields ahead when not touched before (it's on first line)
    var aheadAheadField = fieldAhead.selectAhead(this.set);
    if (aheadAheadField && fieldAhead.isEmpty() && aheadAheadField.isEmpty() && notTouched) {
      possibleMoves.push(aheadAheadField);
    }

    //3. Beat enemy
    var enemyFieldLeft = fieldAhead.selectLeft();
    if (enemyFieldLeft && !enemyFieldLeft.isEmpty() && isEnemySet(enemyFieldLeft.chessPiece.set)) {
      possibleMoves.push(enemyFieldLeft);
    }
    var enemyFieldRight = fieldAhead.selectRight();
    if (enemyFieldRight && !enemyFieldRight.isEmpty() && isEnemySet(enemyFieldRight.chessPiece.set)) {
      possibleMoves.push(enemyFieldRight);
    }
  }

  //4. @todo: en route

  return possibleMoves;
};

var Rook = function (chessSet, field) {
  this.set = chessSet;
  this.field = field;
};

Rook.prototype = new ChessPiece('rook', 'r');
Rook.prototype.constructor = Rook;
Rook.prototype._generateAllPossibleMoves = function () {
  var possibleMoves = [];

  rangeSelector(this.field, 'selectLeft', possibleMoves);
  rangeSelector(this.field, 'selectRight', possibleMoves);
  rangeSelector(this.field, 'selectAbove', possibleMoves);
  rangeSelector(this.field, 'selectBelow', possibleMoves);

  return possibleMoves;
};


var Knight = function (chessSet, field) {
  this.set = chessSet;
  this.field = field;
};
Knight.prototype = new ChessPiece('knight', 'n');
Knight.prototype.constructor = Knight;
Knight.prototype._generateAllPossibleMoves = function () {
  var possibleMoves = [];

  var validateAndAdd = function (rowOffset, colOffset) {
    var selectedField = selectedField = this.field.board.select(this.field.row + rowOffset, this.field.col + colOffset);
    if (selectedField && (selectedField.isEmpty() || selectedField.chessPiece.set.isEnemyOf(this.set)))
      possibleMoves.push(selectedField);
  }.bind(this);

  validateAndAdd(2, 1);
  validateAndAdd(-2, 1);
  validateAndAdd(2, -1);
  validateAndAdd(-2, -1);
  validateAndAdd(1, 2);
  validateAndAdd(1, -2);
  validateAndAdd(-1, 2);
  validateAndAdd(-1, -2);

  return possibleMoves;
};

var Bishop = function (chessSet, field) {
  this.set = chessSet;
  this.field = field;
};
Bishop.prototype = new ChessPiece('bishop', 'b');
Bishop.prototype.constructor = Bishop;
Bishop.prototype._generateAllPossibleMoves = function () {
  var possibleMoves = [];

  rangeSelector(this.field, 'selectUpperRight', possibleMoves);
  rangeSelector(this.field, 'selectUpperLeft', possibleMoves);
  rangeSelector(this.field, 'selectLowerRight', possibleMoves);
  rangeSelector(this.field, 'selectLowerLeft', possibleMoves);

  return possibleMoves;
};

var Queen = function (chessSet, field) {
  this.set = chessSet;
  this.field = field;
};
Queen.prototype = new ChessPiece('queen', 'q');
Queen.prototype.constructor = Queen;
Queen.prototype._generateAllPossibleMoves = function () {
  var possibleMoves = [];

  rangeSelector(this.field, 'selectUpperRight', possibleMoves);
  rangeSelector(this.field, 'selectUpperLeft', possibleMoves);
  rangeSelector(this.field, 'selectLowerRight', possibleMoves);
  rangeSelector(this.field, 'selectLowerLeft', possibleMoves);

  rangeSelector(this.field, 'selectLeft', possibleMoves);
  rangeSelector(this.field, 'selectRight', possibleMoves);
  rangeSelector(this.field, 'selectAbove', possibleMoves);
  rangeSelector(this.field, 'selectBelow', possibleMoves);

  return possibleMoves;
};

var King = function (chessSet, field) {
  this.set = chessSet;
  this.field = field;
};
King.prototype = new ChessPiece('king', 'k');
King.prototype.constructor = King;
King.prototype._generateAllPossibleMoves = function () {
  var possibleMoves = [];

  var set = this.set;

  function checkField(field) {
    if (field && (field.isEmpty() || field.chessPiece.set.isEnemyOf(set))) {
      possibleMoves.push(field);
    }
  }

  checkField(this.field.selectUpperLeft());
  checkField(this.field.selectAbove());
  checkField(this.field.selectUpperRight());
  checkField(this.field.selectLeft());
  checkField(this.field.selectRight());
  checkField(this.field.selectLowerLeft());
  checkField(this.field.selectBelow());
  checkField(this.field.selectLowerRight());

  return possibleMoves;
};

module.exports = {
  Pawn: Pawn,
  Rook: Rook,
  Knight: Knight,
  Bishop: Bishop,
  Queen: Queen,
  King: King
};