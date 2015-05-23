var _ = require('lodash');

/**
 * MinMax strategy
 * @param childStateGenerator {function} - returns child states binded with action or empty array MUST BE STABLE
 * @param measurement {function} - returns quality of given state
 * @param [MAX_DEPTH=4]
 * @returns {AiStrategy}
 */
module.exports = function (childStateGenerator, measurement, MAX_DEPTH) {
  var MAX_DEPTH = MAX_DEPTH || 4;

  var minmax = function (parentState, depth) {
    if (depth == MAX_DEPTH) {
      return {
        state: parentState,
        action: undefined
      };
    }

    var selectFun = depth % 2 === 0 ? _.max : _.min;

    var childStatesAndActions = childStateGenerator(parentState);

    if (childStatesAndActions.length == 0) {
      return {
        state: parentState,
        action: undefined
      };
    }

    var resultStates = childStatesAndActions.map(function (stateAndAction) {
      var newState = (minmax(stateAndAction.state,  depth + 1));

      return {
        state: newState.state,
        action: stateAndAction.action
      };
    });

    var best = selectFun(resultStates, function (stateAndAction) {
      return measurement(stateAndAction.state);
    });

    return best;
  };

  return {
    findSolution: function (state) {
      return minmax(state, 0);
    }
  }
};