var _ = require('lodash');
var ChessBoardRepresentation = require('./ChessBoard/ChessBoardRepresentation');
var ChessSet = require('./ChessSet');
var RandomStrategy = require('./AiStrategies/RandomStrategy');
var MinMaxStrategy = require('./AiStrategies/MinMaxStrategy');
var AlphaBetaStrategy = require('./AiStrategies/AlphaBetaStrategy');
var StatesGenerator = require('./StateGenerators/StatesGenerator');
var StatesIterator = require('./StateGenerators/StatesIterator');
var WeightedMeasure = require('./ChessBoardMeasures/WeightedMeasure');
var TableWeightedMeasure = require('./ChessBoardMeasures/TableWeightedMeasure');

var ChessAi = function(options) {

  var defaultOptions = {
    set: 'b', //computer starts as black
    strategy: 'alphabeta',
    measure: 'table-weighted',
    depth: '4',
    initialState: ChessBoardRepresentation.startingPopulation()
  };

  options = _.extend(defaultOptions, options);

  console.log("Initializing AI with options: ");
  console.log(options);


  this.aiSet = options.set == 'w'? ChessSet.white : ChessSet.black;
  this.playerSet = this.aiSet.getEnemy();


  var measurement;
  switch (options.measure) {
    case 'weighted' :
      measurement = WeightedMeasure(this.aiSet);
      break;
    case 'table-weighted' :
      measurement = TableWeightedMeasure(this.aiSet);
      break;
    default: throw new Error('Unsupported measurement');
  }

  var childStateGenerator;
  switch(options.strategy) {
    case 'random':
      childStateGenerator = StatesGenerator();
      this.aiStrategy = RandomStrategy(childStateGenerator.generateChildrenStates, measurement, options.depth);
      break;
    case 'minmax':
      childStateGenerator = StatesGenerator();
      this.aiStrategy = MinMaxStrategy(childStateGenerator.generateChildrenStates, measurement, options.depth);
      break;
    case 'alphabeta':
      var childStateIterator = StatesIterator;
      this.aiStrategy = AlphaBetaStrategy(childStateIterator, measurement, options.depth);
      break;
    default: throw new Error('Unsupported strategy');
  }

  this.board = options.initialState;
  this.gameHistory = [];
};


/**
 * Checks if given move is valid
 * @param move.source {object} - string representation of source field ex. a5
 * @param move.target {object} - string representation of target field ex. a6
 * @returns {boolean}
 */
ChessAi.prototype.isMoveValid = function(move) {
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
 * @param playerMove.source {object} - string representation of source field ex. a5
 * @param playerMove.target {object} - string representation of target field ex. a6
 * @returns {boolean} - is move legal
 */
ChessAi.prototype.playerMove = function(playerMove) {
  if (this.board.setInControl != this.playerSet) {
    throw new Error("IT IS NOT PLAYER'S TURN");
  }
  if (!this.isMoveValid(playerMove))
    return null;

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


module.exports = ChessAi;