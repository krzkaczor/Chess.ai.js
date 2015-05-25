var _ = require("lodash");

module.exports = function () {
  return {
    /**
     * Generates all possible moves
     */
    generateChildrenStates: function (state) {
      var moves = _.flatten(state.getPiecesForSet(state.setInControl).map(function (chessPiece) {
        return chessPiece.generateAllPossibleMoves().map(function (target) {
          return {
            source: chessPiece.field.toSimpleField(),
            target: target.toSimpleField()
          };
        });
      }));

      return moves.map(function (move) {
        return {
          action: move,
          state: state.makeMove(move)
        }
      });
    }
  }
};