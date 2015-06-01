var _ = require('lodash');
var Player = require('./Player');

var HumanPlayer = function(set, chessAi) {
  this.chessAi = chessAi;
  Player.apply(this, set);
};

HumanPlayer.prototype = new Player();

HumanPlayer.prototype.playerTurn = function(callback) {
  this.callback = callback;
};

HumanPlayer.prototype.onDrop = function(source, target) {
  if (!this.callback) {
    return;
  }

  if (_.isEqual(source, target))
    return;

  var moveAction = {action: moveWithStringNotationToMoveWithPosition({source: source, target: target})};

  if (this.chessAi.isMoveValid(moveAction.action)) {
    this.callback(moveAction);
    this.callback = undefined;
  } else {
    return 'snapback';
  }
};


var moveWithStringNotationToMoveWithPosition = function (move) {
  return {
    source: stringNotationToPosition(move.source),
    target: stringNotationToPosition(move.target)
  }
};

var stringNotationToPosition = function (stringNotation) {
  return {
    col: stringNotation.charCodeAt(0) - 'a'.charCodeAt(0),
    row: parseInt(stringNotation[1] - 1)
  }
};


module.exports = HumanPlayer;