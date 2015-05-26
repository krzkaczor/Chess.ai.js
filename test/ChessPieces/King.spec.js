var expect = require('chai').expect;
var _ = require('lodash');
var tu = require('../TestUtils');
var ChessBoardRepresentation = require('../../app/Chessboard/ChessBoardRepresentation');
var ChessPiecesFactory = require('../../app/ChessPiecesFactory');
var ChessSet = require('../../app/ChessSet');


describe('King', function() {
  it('should move on board', function() {
    var board = new ChessBoardRepresentation();
    var king = new ChessPiecesFactory.King(ChessSet.white);

    board.select(4, 4).occupyBy(king);

    var possibleMoves = king.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(8);

    var expectedMoves = [
      tu.makeMove(5, 3),
      tu.makeMove(5, 4),
      tu.makeMove(5, 5),
      tu.makeMove(4, 3),
      tu.makeMove(4, 5),
      tu.makeMove(3, 3),
      tu.makeMove(3, 4),
      tu.makeMove(3, 5)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });


  it('should not be able to beat friendly chess piece', function() {
    var board = new ChessBoardRepresentation();
    var king = new ChessPiecesFactory.King(ChessSet.white);
    var pawn = new ChessPiecesFactory.Pawn(ChessSet.white);

    board.select(4, 4).occupyBy(king);
    board.select(5, 4).occupyBy(pawn);

    var possibleMoves = king.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(7);

    var expectedMoves = [
      tu.makeMove(5, 3),
      tu.makeMove(5, 5),
      tu.makeMove(4, 3),
      tu.makeMove(4, 5),
      tu.makeMove(3, 3),
      tu.makeMove(3, 4),
      tu.makeMove(3, 5)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });

  it('should be able to enemy chess piece', function() {
    var board = new ChessBoardRepresentation();
    var king = new ChessPiecesFactory.King(ChessSet.white);
    var pawn = new ChessPiecesFactory.Pawn(ChessSet.black);

    board.select(4, 4).occupyBy(king);
    board.select(5, 4).occupyBy(pawn);

    var possibleMoves = king.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(8);

    var expectedMoves = [
      tu.makeMove(5, 3),
      tu.makeMove(5, 4),
      tu.makeMove(5, 5),
      tu.makeMove(4, 3),
      tu.makeMove(4, 5),
      tu.makeMove(3, 3),
      tu.makeMove(3, 4),
      tu.makeMove(3, 5)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });

  it('should not be able to move out of board', function() {
    var board = new ChessBoardRepresentation();
    var king = new ChessPiecesFactory.King(ChessSet.white);

    board.select(0, 0).occupyBy(king);

    var possibleMoves = king.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(3);

    var expectedMoves = [
      tu.makeMove(1, 0),
      tu.makeMove(1, 1),
      tu.makeMove(0, 1)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });
});