var expect = require('chai').expect;
var _ = require('lodash');
var tu = require('../TestUtils');
var ChessBoardRepresentation = require('../../app/Chessboard/ChessBoardRepresentation');
var ChessPiecesFactory = require('../../app/ChessPiecesFactory')();
var ChessSet = require('../../app/ChessSet');


describe('Bishop', function() {
  it('should move on board', function() {
    var board = new ChessBoardRepresentation();
    var bishop = new ChessPiecesFactory.Bishop(ChessSet.white);

    board.select(4, 3).occupyBy(bishop);

    var possibleMoves = bishop.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(13);

    var expectedMoves = [
      tu.makeMove(1, 0),
      tu.makeMove(2, 1),
      tu.makeMove(3, 2),
      tu.makeMove(5, 4),
      tu.makeMove(6, 5),
      tu.makeMove(7, 6),

      tu.makeMove(7, 0),
      tu.makeMove(6, 1),
      tu.makeMove(5, 2),
      tu.makeMove(3, 4),
      tu.makeMove(2, 5),
      tu.makeMove(1, 6),
      tu.makeMove(0, 7)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });


  it('should not be able to beat friendly chess piece', function() {
    var board = new ChessBoardRepresentation();
    var bishop = new ChessPiecesFactory.Bishop(ChessSet.white);
    var pawn = new ChessPiecesFactory.Pawn(ChessSet.white);

    board.select(4, 3).occupyBy(bishop);
    board.select(3, 4).occupyBy(pawn);

    var possibleMoves = bishop.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(9);

    var expectedMoves = [
      tu.makeMove(1, 0),
      tu.makeMove(2, 1),
      tu.makeMove(3, 2),
      tu.makeMove(5, 4),
      tu.makeMove(6, 5),
      tu.makeMove(7, 6),

      tu.makeMove(7, 0),
      tu.makeMove(6, 1),
      tu.makeMove(5, 2)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });

  it('should be able to enemy chess piece', function() {
    var board = new ChessBoardRepresentation();
    var bishop = new ChessPiecesFactory.Bishop(ChessSet.white);
    var pawn = new ChessPiecesFactory.Pawn(ChessSet.black);

    board.select(4, 3).occupyBy(bishop);
    board.select(3, 4).occupyBy(pawn);

    var possibleMoves = bishop.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(10);

    var expectedMoves = [
      tu.makeMove(1, 0),
      tu.makeMove(2, 1),
      tu.makeMove(3, 2),
      tu.makeMove(5, 4),
      tu.makeMove(6, 5),
      tu.makeMove(7, 6),

      tu.makeMove(7, 0),
      tu.makeMove(6, 1),
      tu.makeMove(5, 2),
      tu.makeMove(3, 4)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });
});