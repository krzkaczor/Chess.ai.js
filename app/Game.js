var ChessBoardRepresentation = require('./ChessBoardRepresentation');

var chessBoardRepresentation = new ChessBoardRepresentation();

chessBoardRepresentation.populate();

console.log('Fen notation: ' + chessBoardRepresentation.toFenNotation());

var boardCfg = {
  draggable: true,
  position: 'start',
  //onDragStart: onDragStart,
  //onDrop: onDrop,
};

var board = new ChessBoard('chess-board', boardCfg);
