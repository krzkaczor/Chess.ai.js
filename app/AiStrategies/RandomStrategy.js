var _ = require('lodash');

module.exports = function() {
  return {
    findMove: function(board, chessSetInControl) {
      var possibleMoves = board.generateAllPossibleMovesForSet(chessSetInControl);
      return _.sample(possibleMoves);
    }
  };
};