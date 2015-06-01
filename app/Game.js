var _ = require('lodash');
var ChessAi = require('./Chess.ai');
var ChessSet = require('./ChessSet');
var HumanPlayer = require('./Players/HumanPlayer');

var blackPlayer = new ChessAi({
  set: 'b',
  strategy: 'random',
  depth: '2'
});

blackPlayer.playerTurn = function(cb) {
  cb(this.aiMove());
};

var chessAi = blackPlayer;

var whitePlayer = new HumanPlayer(ChessSet.white, chessAi);

var white = true;
var dispatcher = function () {
  var moving, waiting;
  if (white) {
    moving = whitePlayer;
    waiting = blackPlayer;
  } else {
    moving = blackPlayer;
    waiting = whitePlayer;
  }

  moving.playerTurn(function(move) {
    var moveAction = move.action;
    waiting.playerMove(moveAction);

    setTimeout(function () {
      dispatcher();
    }, 500);
  });

  board.position(blackPlayer.getGameState());

  white = !white;

  //detect cycle
  //detectCycle();
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function () {
  board.position(chessAi.getGameState());
};


var boardCfg = {
  draggable: true,
  onDrop: whitePlayer.onDrop.bind(whitePlayer),
  onSnapEnd: onSnapEnd
};

var board = new ChessBoard('chess-board', boardCfg);

board.position(chessAi.getGameState());

dispatcher();