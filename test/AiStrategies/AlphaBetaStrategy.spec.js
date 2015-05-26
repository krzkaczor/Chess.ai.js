var expect = require('chai').expect;
var fx = require('node-fixtures');
var Strategy = require('../../app/AiStrategies/AlphaBetaStrategy');

describe('Alpha Beta Strategy', function () {
  var childStateIterator = function (parentState) {
    var data;
    if (!parentState.children) {
      data = [];
    } else {
      data = parentState.children.map(function (child, index) {
        return {
          state: child,
          action: index
        }
      })
    }

    var currentIndex = 0;
    return {
      hasNext: function () {
        return currentIndex < data.length;
      },

      next: function () {
        return data[currentIndex++];
      }
    }
  };

  var measurement = function (state) {
    return state.quality;
  };

  var player = {
    getEnemy: function () {
      return player;
    }
  };

  it('should find best solution on basic tree', function () {
    var states = fx.GameTree4x2;

    var minMax = Strategy(childStateIterator, measurement, 2);

    var res = minMax.findSolution(states);
    expect(res.value).to.be.equal(-45);
    expect(res.action).to.be.equal(0);
  });

  it('should find best solution on complex tree', function () {
    var states = fx.GameTree2x4;

    var minMax = Strategy(childStateIterator, measurement);

    expect(minMax.findSolution(states).value).to.be.equal(36);
    expect(minMax.findSolution(states).action).to.be.equal(0);
  });

  it('should find best solution on unbalanced tree', function () {
    var states = fx.UnbalancedGameTree;

    var minMax = Strategy(childStateIterator, measurement);

    expect(minMax.findSolution(states).value).to.be.equal(68);
    expect(minMax.findSolution(states).action).to.be.equal(1);
  });

  it('should find solution on even tree', function () {
    var states = fx.GameTreeEven;

    var minMax = Strategy(childStateIterator, measurement, 5);

    expect(minMax.findSolution(states).value).to.be.equal(0);
    expect(minMax.findSolution(states).action).to.be.equal(0);
  });

});