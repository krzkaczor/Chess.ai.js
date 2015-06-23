var _ = require('lodash');
var Player = require('./Player');
var ChessAi = require('../../../app/Chess.ai');

var ComputerPlayer = function(set, config) {
  this.chessAi = new ChessAi(config);
  Player.apply(this, set);
};

ComputerPlayer.prototype = new Player();

ComputerPlayer.prototype.playerTurn = function(callback) {
  callback(this.chessAi.aiMove());
};

ComputerPlayer.prototype.playerMove = function(move) {
  this.chessAi.playerMove(move);
};

module.exports = ComputerPlayer;