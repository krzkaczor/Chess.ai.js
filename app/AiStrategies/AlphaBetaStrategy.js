var _ = require('lodash');

/**
 * Alpha Beta improvement to minmax
 * @param childStateGenerator {function} - returns child states binded with action or empty array MUST BE STABLE
 * @param measurement {function} - returns quality of given state
 * @param [MAX_DEPTH=4]
 * @returns {AiStrategy}
 */
module.exports = function (childStateIterator, measurement, MAX_DEPTH) {
  var MAX_DEPTH = MAX_DEPTH || 4;

  var minmax = function (parentState) {
    var res = alphabeta(parentState, 0,-Number.MAX_VALUE, Number.MAX_VALUE);
    return {
      state: res.state,
      action: res.action,
      value: res.value
    }
  };

  var alphabeta = function(parentState, depth, alpha, beta) {
    var childState;
    var res;
    var best = {};
    var it = childStateIterator(parentState);
    if (depth == MAX_DEPTH || !it.hasNext()) {
      return {
        action: 0,
        value: measurement(parentState),
      };
    }

    var max = depth % 2 === 0;

    if (!max) {
      while(it.hasNext()) {
        childState = it.next();
        res = alphabeta(childState.state, depth + 1, alpha, beta);
        if (res.value < beta) {
          beta = res.value;
          best = res;
          best.action = it.getIndex() - 1; //currently it points to next item
        }
        if (alpha >= beta) {
          break;
        }
      }

      best.value = beta;
      return best;
    } else {
      while(it.hasNext()) {
        childState = it.next();
        res = alphabeta(childState.state, depth + 1, alpha, beta);

        if (res.value > alpha) {
          alpha = res.value;
          best = res;
          best.action = it.getIndex() - 1; //currently it points to next item
        }
        if (alpha > beta) {
          break;
        }
      }

      best.value = alpha;
      return best;
    }
  };

  return {
    findSolution: function (state) {
      return minmax(state, 0);
    }
  }
};