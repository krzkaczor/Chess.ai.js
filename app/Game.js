var _ = require('lodash');
var ChessAi = require('./Chess.ai');

var chessAi = new ChessAi();

global.chessAi = chessAi;

var onDrop = function (source, target) {
  if (_.isEqual(source, target))
    return;

  var move = {source: source, target: target};

  if (chessAi.isMoveValid(move)) {
    chessAi.makeMove(move);
  } else {
    return 'snapback';
  }
  console.log("White chess pieces: ", chessAi.board.whitePieces.length);
  console.log("Black chess pieces: ", chessAi.board.blackPieces.length);
};

var boardCfg = {
  draggable: true,
  onDrop: onDrop
};

var board = new ChessBoard('chess-board', boardCfg);

board.position(chessAi.getGameState());

console.log("White chess pieces: ", chessAi.board.whitePieces.length);
console.log("Black chess pieces: ", chessAi.board.blackPieces.length);