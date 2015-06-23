var ChessAi = require('../../../app/Chess.ai');

var chessAi;

var init = function(config) {
  chessAi = new ChessAi(config);
};

var playerMove = function(move) {
  chessAi.playerMove(move);
};

var aiMove = function() {
  var move = chessAi.aiMove();
  self.postMessage(move);
};

self.onmessage = function(message) {
  console.log(message);

  switch(message.data.type) {
    case 'init' : init(message.data.value); break;
    case 'player-move' : playerMove(message.data.value); break;
    case 'ai-move' : aiMove(message.data.value); break;
  }

};