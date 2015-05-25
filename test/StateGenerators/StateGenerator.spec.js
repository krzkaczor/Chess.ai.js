var expect = require('chai').expect;
var _ = require('lodash');
var tu = require('./../TestUtils');
var ChessBoardRepresentation = require('../../app/ChessBoard/ChessBoardRepresentation');
var ChessPiecesFactory = require('../../app/ChessPiecesFactory')();
var ChessSet = require('../../app/ChessSet');
var StatesGenerator = require('../../app/StateGenerators/StatesGenerator');

describe('State Generator', function() {
  it('should generate all possible child states for game state', function() {
    var initState = new ChessBoardRepresentation();
    initState.setInControl = ChessSet.black;

    var whitePawn = new ChessPiecesFactory.Pawn(ChessSet.white);
    var blackPawn = new ChessPiecesFactory.Pawn(ChessSet.black);

    initState.select(1, 0).occupyBy(initState.register(whitePawn));
    initState.select(6, 0).occupyBy(initState.register(blackPawn));

    var moveGenerator = StatesGenerator();

    var blackStates = moveGenerator.generateChildrenStates(initState);

    expect(blackStates.length).to.be.equal(2);
    expect(blackStates[0].state.toFenNotation()).to.be.equal("8/8/p7/8/8/8/P7/8");
    expect(blackStates[0].action).to.be.eql({source: tu.makeMove(6,0), target: tu.makeMove(5, 0)});
    expect(blackStates[1].state.toFenNotation()).to.be.equal("8/8/8/p7/8/8/P7/8");
    expect(blackStates[1].action).to.be.eql({source: tu.makeMove(6,0), target: tu.makeMove(4, 0)});
  });
});