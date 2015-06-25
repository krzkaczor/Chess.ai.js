var _ = require('lodash');
var ChessGame = require('./../../app/ChessGame');
var ChessSet = require('./../../app/ChessSet');
var HumanPlayer = require('./Players/HumanPlayer');
var ComputerPlayer = require('./Players/ComputerPlayer');

var ComputerAIConfig = {
  set: 'b',
  strategy: 'alphabeta',
  depth: '5' //max reasonable depth is 5
};

var chessGame = new ChessGame();

var whitePlayer = new HumanPlayer(ChessSet.white, chessGame);
var blackPlayer = new ComputerPlayer(ChessSet.black, ComputerAIConfig);

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
    chessGame.registerMove(moveAction);

    waiting.playerMove(moveAction);

    setTimeout(function () {
      dispatcher();
    }, 100);
  });

  board.position(chessGame.getGameState());

  white = !white;
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function () {
  board.position(chessGame.getGameState());
};

var printStatus = function() {
  console.log("=======================");
  console.log("Turn: " + (chessGame.board.setInControl.isWhite()? 'white' : 'black'));

  if (chessGame.board.isCheck(ChessSet.white)) {
    console.log('WHITE CHECKED');
  }
  if (chessGame.board.isCheckMate(ChessSet.white)) {
    console.log('WHITE CHECK MATED');
  }

  if (chessGame.board.isCheck(ChessSet.black)) {
    console.log('BLACK CHECKED');
  }
  if (chessGame.board.isCheckMate(ChessSet.black)) {
    console.log('BLACK CHECK MATED');
  }

  console.log("White pieces: " + chessGame.board.getPiecesForSet(ChessSet.white).length );
  console.log("Black pieces: " + chessGame.board.getPiecesForSet(ChessSet.black).length );
};

var boardCfg = {
  draggable: true,
  onDrop: whitePlayer.onDrop.bind(whitePlayer),
  onSnapEnd: onSnapEnd
};

var board = new ChessBoard('chess-board', boardCfg);

board.position(chessGame.getGameState());

dispatcher();