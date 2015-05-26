var _ = require('lodash');
var ChessAi = require('./Chess.ai');
var WeightedMeasure = require('./ChessBoardMeasurements/WeightedMeasure');
var ChessSet = require('./ChessSet');

var chessAiWhite = new ChessAi({
  set: 'w',
  strategy: 'alphabeta',
  depth: '3'
});

var chessAiBlack = new ChessAi({
  set: 'b',
  strategy: 'random',
  depth: '2'
});

var RandomStrategy = require('./AiStrategies/RandomStrategy');
var StatesGenerator = require('./StateGenerators/StatesGenerator');

var chessAi = chessAiWhite; //there should be in constant sync


var white = true;
var dispatcher = function () {
  var moving, waiting;
  if (white) {
    console.log(chessAi.board.whitePieces.length + ", " + chessAi.board.blackPieces.length);
    moving = chessAiWhite;
    waiting = chessAiBlack;
  } else {
    moving = chessAiBlack;
    waiting = chessAiWhite;
  }

  var move = moving.aiMove().action;
  waiting.playerMove(move);

  board.position(chessAiBlack.getGameState());

  white = !white;

  //detect cycle
  detectCycle();

  setTimeout(function () {
    dispatcher();
  }, 300);
};

var retarted = false;
var detectCycle = function () {
  if (!retarted && chessAi.gameHistory.length > 10 && chessAi.gameHistory[chessAi.gameHistory.length - 3].toFenNotation() == chessAi.gameHistory[chessAi.gameHistory.length - 1].toFenNotation()) {
    console.log("RETARDING...");
    var childStateGenerator = StatesGenerator();
    var newAiStrategy = RandomStrategy(childStateGenerator.generateChildrenStates);
    if (chessAi.board.whitePieces.length > chessAi.board.blackPieces.length) {
      chessAiBlack.aiStrategy = newAiStrategy;
    } else {
      chessAiWhite.aiStrategy = newAiStrategy;
    }
    retarted = true;
  }
};

//var onDrop = function (source, target) {
//  if (_.isEqual(source, target))
//    return;
//
//  var move = moveWithStringNotationToMoveWithPosition({source: source, target: target});
//
//  if (chessAi.isMoveValid(move)) {
//    chessAi.playerMove(move);
//    chessAi.aiMove(move);
//  } else {
//    return 'snapback';
//  }
//  console.log("White chess pieces: ", chessAi.board.whitePieces.length);
//  console.log("SCORE FOR WHITE: " + WeightedMeasure(ChessSet.white)(chessAi.board));
//  console.log("Black chess pieces: ", chessAi.board.blackPieces.length);
//  console.log("SCORE FOR BLACK: " + WeightedMeasure(ChessSet.black)(chessAi.board));
//};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function () {
  board.position(chessAiBlack.getGameState());

  if (chessAiBlack.board.isCheck(ChessSet.white)) {
    console.log("White Check");
  }

  if (chessAiBlack.board.isCheck(ChessSet.black)) {
    console.log("Black Check");
  }
};


var boardCfg = {
  //draggable: true,
  //onDrop: onDrop,
  onSnapEnd: onSnapEnd

};

var board = new ChessBoard('chess-board', boardCfg);

board.position(chessAi.getGameState());

console.log("White chess pieces: ", chessAi.board.whitePieces.length);
console.log("Black chess pieces: ", chessAi.board.blackPieces.length);


var moveWithStringNotationToMoveWithPosition = function (move) {
  return {
    source: stringNotationToPosition(move.source),
    target: stringNotationToPosition(move.target)
  }
};

var stringNotationToPosition = function (stringNotation) {
  return {
    col: stringNotation.charCodeAt(0) - 'a'.charCodeAt(0),
    row: parseInt(stringNotation[1] - 1)
  }
};

dispatcher();