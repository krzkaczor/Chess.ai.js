var _ = require('lodash');
var ChessBoardRepresentation = require('./ChessBoard/ChessBoardRepresentation');
var ChessSet = require('./ChessSet');
var RandomStrategy = require('./AiStrategies/RandomStrategy');
var MinMaxStrategy = require('./AiStrategies/MinMaxStrategy');
var AlphaBetaStrategy = require('./AiStrategies/AlphaBetaStrategy');
var StatesGenerator = require('./StateGenerators/StatesGenerator');
var StatesIterator = require('./StateGenerators/StatesIterator');
var WeightedMeasure = require('./ChessBoardMeasurements/WeightedMeasure');

var defaultOptions = {
  set: 'b', //computer starts as black
  strategy: 'alphabeta',
  depth: '2',
  initialState: ChessBoardRepresentation.startingPopulation()
};

var ChessAi = function(options) {
  options = _.extend(defaultOptions, options);

  this.aiSet = options.set == 'w'? ChessSet.white : ChessSet.black;
  this.playerSet = this.aiSet.getEnemy();

  switch(options.strategy) {
    case 'minmax':
      var childStateGenerator = StatesGenerator();
      var measurement = WeightedMeasure(this.aiSet);

      this.aiStrategy = MinMaxStrategy(childStateGenerator.generateChildrenStates, measurement, options.depth);
      break;
    case 'alphabeta':
      var childStateIterator = StatesIterator;
      var measurement = WeightedMeasure(this.aiSet);

      this.aiStrategy = AlphaBetaStrategy(childStateIterator, measurement, options.depth);
      break;
    default: throw new Error('Unsupported strategy'); break;
  }

  this.board = options.initialState;
  this.gameHistory = [];
};


/**
 * Checks if given move is valid
 * @param move.source {string} - string representation of source field ex. a5
 * @param move.target {string} - string representation of target field ex. a6
 * @returns {boolean}
 */
ChessAi.prototype.isMoveValid = function(move) {
  move = moveWithStringNotationToMoveWithPosition(move);
  var isValid = this.board.select(move.source).getChessPiece().canMove(move.target);
  if (isValid) {
    var nextState = this.board.makeMove(move);
    return !nextState.isCheck(this.playerSet);
  }
  return isValid;
};

/**
 * Perform player's move.
 * @param playerMove - description of user's move
 * @param playerMove.source {string} - string representation of source field ex. a5
 * @param playerMove.target {string} - string representation of target field ex. a6
 * @returns {boolean} - is move legal
 */
ChessAi.prototype.playerMove = function(playerMove) {
  if (this.board.setInControl != this.playerSet) {
    throw new Error("IT IS NOT PLAYER'S TURN");
  }
  if (!this.isMoveValid(playerMove))
    return null;

  playerMove = moveWithStringNotationToMoveWithPosition(playerMove);
  this.gameHistory.push(this.board);
  this.board = this.board.makeMove(playerMove);
};


/**
 Find and perform move for AI. Current implementation is single threaded so enjoy your blocked UI thread.
 */
ChessAi.prototype.aiMove = function() {
  if (this.board.setInControl != this.aiSet) {
    throw new Error("IT IS NOT AI'S TURN");
  }
  var aiMove = this.aiStrategy.findSolution(this.board, this.aiSet);

  this.board = this.board.makeMove(aiMove.action);
  return aiMove;
};

/**
 * Get current game state in FEN notation
 * @returns {string}
 */
//@todo: it should be noted in method name that it returns string
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

var check

module.exports = ChessAi;