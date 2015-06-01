var _ = require('lodash');

module.exports = function (childStateGenerator) {
  return {
    findSolution: function (initialState) {
      var possibleMoves = childStateGenerator(initialState);
      return _.sample(possibleMoves);
    }
  };
};