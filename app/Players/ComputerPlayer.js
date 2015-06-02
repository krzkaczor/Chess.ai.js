var _ = require('lodash');
var Player = require('./Player');

var ComputerPlayer = function(set, chessAi) {
  this.chessAi = chessAi;
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