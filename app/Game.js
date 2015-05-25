var _ = require('lodash');
var ChessAi = require('./Chess.ai');
var WeightedMeasure = require('./ChessBoardMeasurements/WeightedMeasure');
var ChessSet = require('./ChessSet');

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
  console.log("SCORE FOR WHITE: " + WeightedMeasure(ChessSet.white)(chessAi.board));
  console.log("Black chess pieces: ", chessAi.board.blackPieces.length);
  console.log("SCORE FOR BLACK: " + WeightedMeasure(ChessSet.black)(chessAi.board));
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(chessAi.getGameState());
};


var boardCfg = {
  draggable: true,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd

};

var board = new ChessBoard('chess-board', boardCfg);

board.position(chessAi.getGameState());

console.log("White chess pieces: ", chessAi.board.whitePieces.length);
console.log("Black chess pieces: ", chessAi.board.blackPieces.length);