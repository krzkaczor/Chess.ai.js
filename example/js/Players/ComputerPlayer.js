var _ = require('lodash');
var work = require('webworkify');
var computerPlayerWorker = work(require('./ComputerPlayerWorker.js'));

var pendingCallback;
computerPlayerWorker.onmessage = function(message){
  pendingCallback(message.data);
};

var Player = require('./Player');
var ComputerPlayer = function(set, config) {
  computerPlayerWorker.postMessage({type: 'init', value: config});

  Player.apply(this, set);
};

ComputerPlayer.prototype = new Player();

ComputerPlayer.prototype.playerTurn = function(callback) {
  computerPlayerWorker.postMessage({type: 'ai-move'});
  pendingCallback = callback;
};

ComputerPlayer.prototype.playerMove = function(move) {
  computerPlayerWorker.postMessage({type: 'player-move', value: move});
};

module.exports = ComputerPlayer;