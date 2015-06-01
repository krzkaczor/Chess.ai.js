var _ = require("lodash");

module.exports = function (state) {
  var generatedMoves = [];
  var generatedMovesIndex = 0;

  var arrayToProcess = state.getPiecesForSet(state.setInControl);
  var indexToProcess = 0;
  //todo:refactor
  var generateMore = function() {
    var newMoves = false;
    while(indexToProcess < arrayToProcess.length && !newMoves) {
      arrayToProcess[indexToProcess].generateAllPossibleMoves().forEach(function(target) {
        var chessPiece = arrayToProcess[indexToProcess];
        var move = {
          source: chessPiece.field.toSimpleField(),
          target: target.toSimpleField()
        };
        generatedMoves.push(move);
        newMoves = true;
      });
      indexToProcess++;
    }
    return newMoves;
  };

  return {
    hasNext: function() {
      var buffered =  generatedMovesIndex < generatedMoves.length;
      return buffered || generateMore();
    },

    next: function () {
      var move = generatedMoves[generatedMovesIndex++];
      return {
        action: move,
        state: state.makeMove(move)
      };
    }
  };
};