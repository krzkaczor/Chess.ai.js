var _ = require('lodash');
var ChessAi = require('./Chess.ai');
var ChessSet = require('./ChessSet');
var HumanPlayer = require('./Players/HumanPlayer');
var ComputerPlayer = require('./Players/ComputerPlayer');

var chessAi = new ChessAi({
  set: 'b',
  strategy: 'alphabeta',
  depth: '5' //max reasonable depth is 5
});

var whitePlayer = new HumanPlayer(ChessSet.white, chessAi);
var blackPlayer = new ComputerPlayer(ChessSet.black, chessAi);

var white = true;
var dispatcher = function () {
  printStatus();
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
    }, 100);
  });

  board.position(chessAi.getGameState());

  white = !white;
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function () {
  board.position(chessAi.getGameState());
};

var printStatus = function() {
  console.log("=======================");
  console.log("Turn: " + (chessAi.board.setInControl.isWhite()? 'white' : 'black'));

  if (chessAi.board.isCheck(ChessSet.white)) {
    console.log('WHITE CHECKED');
  }
  if (chessAi.board.isCheckMate(ChessSet.white)) {
    console.log('WHITE CHECK MATED');
  }

  if (chessAi.board.isCheck(ChessSet.black)) {
    console.log('BLACK CHECKED');
  }
  if (chessAi.board.isCheckMate(ChessSet.black)) {
    console.log('BLACK CHECK MATED');
  }

  console.log("White pieces: " + chessAi.board.getPiecesForSet(ChessSet.white).length );
  console.log("Black pieces: " + chessAi.board.getPiecesForSet(ChessSet.black).length );
};

var boardCfg = {
  draggable: true,
  onDrop: whitePlayer.onDrop.bind(whitePlayer),
  onSnapEnd: onSnapEnd
};

var board = new ChessBoard('chess-board', boardCfg);

board.position(chessAi.getGameState());

dispatcher();