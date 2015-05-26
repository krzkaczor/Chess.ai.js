var pieceImportance = function (piece) {
  switch (piece.name) {
    case 'pawn' :
      return 1;
    case 'knight' :
      return 3;
    case 'bishop' :
      return 3;
    case 'rook' :
      return 4;
    case 'queen' :
      return 9;
    case 'king' :
      return 10;
    default :
      throw new Error('Unknown chess piece');
  }
};

module.exports = function (player) {
  //manual curring...
  return function(state) {
    if (state.isCheckMate(player)){
      return -Number.MAX_VALUE;
    }

    if (state.isCheckMate(player.getEnemy())){
      return Number.MAX_VALUE;
    }

    var myScore = state.getPiecesForSet(player).reduce(function (a, piece) {

      return a + pieceImportance(piece);
    },0);

    var enemyScore = state.getPiecesForSet(player.getEnemy()).reduce(function (a, piece) {
      return a + pieceImportance(piece);
    }, 0);

    return myScore - enemyScore;
  };
};