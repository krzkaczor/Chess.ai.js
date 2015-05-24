var pieceImportance = function (piece) {
  switch (piece.name) {
    case 'p' :
      return 1;
    case 'n' :
      return 3;
    case 'b' :
      return 3;
    case 'r' :
      return 4;
    case 'q' :
      return 9;
    default :
      throw new Error('Unknown chess piece');
  }
};

module.exports = function (board, player) {
  var hasOwnKing = false;
  var myScore = board.getPiecesForSet(player).reduce(function (a, piece) {
    if (piece.name == 'k') {
      hasOwnKing = true;
      return a;
    }

    return a + pieceImportance(piece);
  });

  if (!hasOwnKing) {
    return Number.MIN_VALUE;
  }
  var hasEnemyKing = false;

  var enemyScore = board.getPiecesForSet(player.getEnemy).reduce(function (a, piece) {
    if (piece.name == 'k') {
      hasEnemyKing = true;
      return a;
    }

    return a + pieceImportance(piece);
  });

  if (!hasEnemyKing) {
    return Number.MAX_VALUE;
  }

  return myScore - enemyScore;
};