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
    default :
      throw new Error('Unknown chess piece');
  }
};

module.exports = function (player) {
  //manual curring...
  return function(state) {
    //refactor
    var hasOwnKing = false;
    var myScore = state.getPiecesForSet(player).reduce(function (a, piece) {
      if (piece.name == 'king') {
        hasOwnKing = true;
        return a;
      }

      return a + pieceImportance(piece);
    },0);

    if (!hasOwnKing) {
      return Number.MIN_VALUE;
    }
    var hasEnemyKing = false;

    var enemyScore = state.getPiecesForSet(player.getEnemy()).reduce(function (a, piece) {
      if (piece.name == 'king') {
        hasEnemyKing = true;
        return a;
      }

      return a + pieceImportance(piece);
    }, 0);

    if (!hasEnemyKing) {
      return Number.MAX_VALUE;
    }

    return myScore - enemyScore;
  };
};