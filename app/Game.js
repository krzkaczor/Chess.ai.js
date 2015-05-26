var _ = require('lodash');
var ChessAi = require('./Chess.ai');
var WeightedMeasure = require('./ChessBoardMeasurements/WeightedMeasure');
var ChessSet = require('./ChessSet');

var chessAi = new ChessAi();

global.chessAi = chessAi;

var onDrop = function (source, target) {
  if (_.isEqual(source, target))
    return;

  var move = moveWithStringNotationToMoveWithPosition({source: source, target: target});

  if (chessAi.isMoveValid(move)) {
    chessAi.playerMove(move);
    chessAi.aiMove(move);
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

  if (chessAi.board.isCheck(ChessSet.white)) {
    console.log("White Check");
  }

  if (chessAi.board.isCheck(ChessSet.black)) {
    console.log("Black Check");
  }
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


var moveWithStringNotationToMoveWithPosition = function(move) {
  return {
    source : stringNotationToPosition(move.source),
    target : stringNotationToPosition(move.target)
  }
};

var stringNotationToPosition = function(stringNotation) {
  return {
    col: stringNotation.charCodeAt(0) - 'a'.charCodeAt(0),
    row: parseInt(stringNotation[1] - 1)
  }
};