var expect = require('chai').expect;
var fx = require('node-fixtures');
var Strategy = require('../../app/AiStrategies/MinMaxStrategy');

describe('Min Max Strategy', function () {
  var childStateGenerator = function (parentState) {
    if (!parentState.children) {
      return [];
    }

    return parentState.children.map(function(child, index) {
      return {
        state: child,
        action: index
      }
    })
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

    var minMax = Strategy(childStateGenerator, measurement, 2);

    expect(minMax.findSolution(states).state.quality).to.be.equal(-45);
    expect(minMax.findSolution(states).action).to.be.equal(0);
  });

  it('should find best solution on complex tree', function () {
    var states = fx.GameTree2x4;

    var minMax = Strategy(childStateGenerator, measurement);

    expect(minMax.findSolution(states).state.quality).to.be.equal(36);
    expect(minMax.findSolution(states).action).to.be.equal(0);
  });

  it('should find best solution on complex tree2', function () {
    var states = fx.UnbalancedGameTree;

    var minMax = Strategy(childStateGenerator, measurement);

    expect(minMax.findSolution(states).state.quality).to.be.equal(68);
    expect(minMax.findSolution(states).action).to.be.equal(1);
  });


});