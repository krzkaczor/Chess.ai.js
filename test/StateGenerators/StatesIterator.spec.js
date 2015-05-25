var expect = require('chai').expect;
var _ = require('lodash');
var tu = require('./../TestUtils');
var ChessBoardRepresentation = require('../../app/ChessBoard/ChessBoardRepresentation');
var ChessPiecesFactory = require('../../app/ChessPiecesFactory')();
var ChessSet = require('../../app/ChessSet');
var StatesIterator = require('../../app/StateGenerators/StatesIterator');

describe('state Generator', function() {
  it('should generate all possible child states for game state', function() {
    var initState = new ChessBoardRepresentation();
    initState.setInControl = ChessSet.black;

    var whitePawn = new ChessPiecesFactory.Pawn(ChessSet.white);
    var blackPawn = new ChessPiecesFactory.Pawn(ChessSet.black);
    var blackPawn2 = new ChessPiecesFactory.Pawn(ChessSet.black);

    initState.select(1, 0).occupyBy(initState.register(whitePawn));
    initState.select(6, 0).occupyBy(initState.register(blackPawn));
    initState.select(5, 1).occupyBy(initState.register(blackPawn2));

    var blackStatesIt = StatesIterator(initState);


    expect(blackStatesIt.hasNext()).to.be.true;
    var state = blackStatesIt.next();
    expect(state.state.toFenNotation()).to.be.equal("8/8/pp6/8/8/8/P7/8");
    expect(state.action).to.be.eql({source: tu.makeMove(6,0), target: tu.makeMove(5, 0)});


    expect(blackStatesIt.hasNext()).to.be.true;
    var state = blackStatesIt.next();
    expect(state.state.toFenNotation()).to.be.equal("8/8/1p6/p7/8/8/P7/8");
    expect(state.action).to.be.eql({source: tu.makeMove(6,0), target: tu.makeMove(4, 0)});

    expect(blackStatesIt.hasNext()).to.be.true;
    var state = blackStatesIt.next();
    expect(state.state.toFenNotation()).to.be.equal("8/p7/8/1p6/8/8/P7/8");
    expect(state.action).to.be.eql({source: tu.makeMove(5,1), target: tu.makeMove(4, 1)});

    expect(blackStatesIt.hasNext()).to.be.false;
  });
});