var _ = require('lodash');

/**
 * Alpha Beta improvement to minmax
 * @param childStateIterator {function} - returns iterators of child states binded with action MUST BE STABLE
 * @param measurement {function} - returns quality of given state
 * @param [MAX_DEPTH=4]
 * @returns {Object}
 */
module.exports = function (childStateIterator, measurement, MAX_DEPTH) {
  var MAX_DEPTH = MAX_DEPTH || 4;

  var alphabeta = function (parentState, depth, alpha, beta) {
    var childState, res;
    var best = {};

    var it = childStateIterator(parentState);
    if (depth == MAX_DEPTH || !it.hasNext()) {
      return {
        action: undefined,
        value: measurement(parentState)
      };
    }

    //refactor...
    if (depth % 2 === 1) {
      while (it.hasNext()) {
        childState = it.next();
        res = alphabeta(childState.state, depth + 1, alpha, beta);

        if (res.value < beta) {
          beta = res.value;
          best = res;
          best.action = childState.action;
        }
        if (alpha >= beta) {
          break;
        }
      }

      best.value = beta;
      return best;
    } else {
      while (it.hasNext()) {
        childState = it.next();
        res = alphabeta(childState.state, depth + 1, alpha, beta);

        if (res.value > alpha) {
          alpha = res.value;
          best = res;
          best.action = childState.action;
        }
        if (alpha >= beta) {
          break;
        }
      }

      best.value = alpha;
      return best;
    }
  };

  return {
    findSolution: function (initialState) {
      console.log("Firing Alpha Beta with max depth: " + MAX_DEPTH);
      return alphabeta(initialState, 0,-Number.MAX_VALUE, Number.MAX_VALUE);
    }
  }
};