var expect = require('chai').expect;
var fx = require('node-fixtures');
var MinmaxStrategy = require('../../app/AiStrategies/MinMaxStrategy');

describe('Min Max Strategy', function () {
  var childStateGenerator = function (parentState) {
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

  it('should find best solution', function () {
    var states = fx.GameTree4x2;

    var minMax = MinmaxStrategy(childStateGenerator, measurement, 2);

    expect(minMax.findSolution(states, player).state.quality).to.be.equal(-45);
    expect(minMax.findSolution(states, player).action).to.be.equal(0);
  });

  it('should find best solution on complex tree', function () {
    var states = fx.GameTree2x4;

    var minMax = MinmaxStrategy(childStateGenerator, measurement, 4);

    expect(minMax.findSolution(states, player).state.quality).to.be.equal(36);
    expect(minMax.findSolution(states, player).action).to.be.equal(0);
  });
});