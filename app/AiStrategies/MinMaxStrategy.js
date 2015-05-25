var _ = require('lodash');

/**
 * MinMax strategy
 * @param childStateGenerator {function} - returns child states binded with action or empty array MUST BE STABLE
 * @param measurement {function} - returns quality of given state
 * @param [MAX_DEPTH=4]
 * @returns {Object}
 */
module.exports = function (childStateGenerator, measurement, MAX_DEPTH) {
  var MAX_DEPTH = MAX_DEPTH || 4;

  var minmax = function (parentState, depth) {
    var childStatesAndActions = childStateGenerator(parentState);
    if (depth == MAX_DEPTH || childStatesAndActions.length == 0) {
      return {
        value: measurement(parentState),
        action: undefined
      };
    }
    var extremeFunction = depth % 2 === 0 ? _.max : _.min;

    var resultStates = childStatesAndActions.map(function (stateAndAction) {
      var result = (minmax(stateAndAction.state,  depth + 1));

      return {
        value: result.value,
        action: stateAndAction.action
      };
    });

    //founds extremum list and returns valueAction object
    return extremeFunction(resultStates, function (valueAndAction) {
      return valueAndAction.value;
    });
  };

  return {
    findSolution: function (initialState) {
      return minmax(initialState, 0);
    }
  }
};