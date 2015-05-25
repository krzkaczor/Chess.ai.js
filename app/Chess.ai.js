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
  strategy: 'alphabeta'
};

var ChessAi = function(options) {
  options = _.extend(defaultOptions, options);

  this.aiSet = options.set == 'w'? ChessSet.white : ChessSet.black;

  switch(options.strategy) {
    case 'random': this.aiStrategy = new RandomStrategy(); break;
    case 'minmax':
      var childStateGenerator = StatesGenerator();
      var measurement = WeightedMeasure(this.aiSet);

      this.aiStrategy = MinMaxStrategy(childStateGenerator.generateChildrenStates, measurement, 3);
      break;
    case 'alphabeta':
      var childStateIterator = StatesIterator;
      var measurement = WeightedMeasure(this.aiSet);

      this.aiStrategy = AlphaBetaStrategy(childStateIterator, measurement, 5);
      break;
    default: throw new Error('Unsupported strategy'); break;
  }

  this.board = options.initialState || ChessBoardRepresentation.startingPopulation();
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
  return this.board.select(move.source).getChessPiece().canMove(move.target);
};

/**
 * Caller makes move and AI makes move. Current implementation is single threaded so enjoy your blocked UI thread.
 * @param playerMove - description of user's move
 * @param playerMove.source {string} - string representation of source field ex. a5
 * @param playerMove.target {string} - string representation of target field ex. a6
 * @returns {boolean} - is move legal
 */
ChessAi.prototype.makeMove = function(playerMove) {
  if (!this.isMoveValid(playerMove))
    return null;

  playerMove = moveWithStringNotationToMoveWithPosition(playerMove);
  this.gameHistory.push(this.board);
  this.board = this.board.makeMove(playerMove);

  //ai move
  this.board = this.board.makeMove(this.aiStrategy.findSolution(this.board, this.aiSet).action);
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