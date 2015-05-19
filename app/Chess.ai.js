var _ = require('lodash');
var ChessBoardRepresentation = require('./ChessBoard/ChessBoardRepresentation');

var ChessAi = function() {
  this.board = ChessBoardRepresentation.startingPopulation();
  this.gameHistory = [];
};


/**
 * Checks if given move is valid
 * @param move.source {string} - string representation of source field ex. a5
 * @param move.source {string} - string representation of target field ex. a6
 * @returns {boolean}
 */
ChessAi.prototype.isMoveValid = function(move) {
  move = moveWithStringNotationToMoveWithPosition(move);
  return this.board.select(move.source).getChessPiece().canMove(move.target);
};

/**
 * Caller makes move and AI makes move
 * @param playerMove - description of user's move
 * @param playerMove.source {string} - string representation of source field ex. a5
 * @param playerMove.source {string} - string representation of target field ex. a6
 * @returns {boolean} - is move legal
 */
ChessAi.prototype.makeMove = function(playerMove) {
  playerMove = moveWithStringNotationToMoveWithPosition(playerMove);
  this.gameHistory.push(this.board);
  this.board = this.board.makeMove(playerMove);
};


/**
 * Get current game state in FEN notation
 * @returns {string}
 */
ChessAi.prototype.getGameState = function() {
  return this.board.toFenNotation();
};

var moveWithStringNotationToMoveWithPosition = function(move) {
  return {
    source : stringNotationToPosition(move.source),
    target : stringNotationToPosition(move.target)
  }
};

var stringNotationToPosition = function(stringNotation) {
  return {
    col: stringNotation.charCodeAt(0) - 'a'.charCodeAt(0),
    row: parseInt(stringNotation[1] - 1)
  }
};

module.exports = ChessAi;