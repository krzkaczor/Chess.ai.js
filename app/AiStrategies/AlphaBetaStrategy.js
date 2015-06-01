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
      var m = measurement(parentState);
      //console.log("\nROOT " + depth + " == " + MAX_DEPTH);
      //console.log("state: " + parentState.toFenNotation());
      //console.log("value: " + m);
      return {
        action: undefined,
        value: m
      };
    }

    //refactor...
    if (depth % 2 === 1) {
      while (it.hasNext()) {
        childState = it.next();

        if (!best) {
          best = childState;
        }

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
    } else {
      while (it.hasNext()) {
        childState = it.next();

        if (!best) {
          best = childState;
        }

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
    }
    if (depth == 0 && best.action === undefined) {
      throw Error("Lack of action!");
    }
    //console.log("\n------------");
    //console.log("DEPTH: " + depth);
    //console.log("state: " + parentState.toFenNotation());
    //console.log("value: " + best.value);
    return best;
  };

  return {
    findSolution: function (initialState) {
      //console.log("Firing Alpha Beta with max depth: " + MAX_DEPTH);
      return alphabeta(initialState, 0,-Number.MAX_VALUE, Number.MAX_VALUE);
    },
    increaseMaxDepth: function() {
      MAX_DEPTH++;
    }
  }
};