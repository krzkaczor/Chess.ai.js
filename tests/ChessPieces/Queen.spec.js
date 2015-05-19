var expect = require('chai').expect;
var _ = require('lodash');
var tu = require('../TestUtils');
var ChessBoardRepresentation = require('../../app/Chessboard/ChessBoardRepresentation');
var ChessPiecesFactory = require('../../app/ChessPiecesFactory')();
var ChessSet = require('../../app/ChessSet');


describe('Queen', function() {
  it('should move on board', function() {
    var board = new ChessBoardRepresentation();
    var queen = new ChessPiecesFactory.Queen(ChessSet.white);

    board.select(4, 3).occupyBy(queen);

    var possibleMoves = queen.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(27);

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
      tu.makeMove(0, 7),

      tu.makeMove(4, 0),
      tu.makeMove(4, 1),
      tu.makeMove(4, 2),
      tu.makeMove(4, 4),
      tu.makeMove(4, 5),
      tu.makeMove(4, 6),
      tu.makeMove(4, 7),

      tu.makeMove(0, 3),
      tu.makeMove(1, 3),
      tu.makeMove(2, 3),
      tu.makeMove(3, 3),
      tu.makeMove(5, 3),
      tu.makeMove(6, 3),
      tu.makeMove(7, 3)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });


  it('should not be able to beat friendly chess piece', function() {
    var board = new ChessBoardRepresentation();
    var queen = new ChessPiecesFactory.Queen(ChessSet.white);
    var pawn = new ChessPiecesFactory.Pawn(ChessSet.white);

    board.select(4, 3).occupyBy(queen);
    board.select(6, 3).occupyBy(pawn);

    var possibleMoves = queen.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(25);

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
      tu.makeMove(0, 7),

      tu.makeMove(4, 0),
      tu.makeMove(4, 1),
      tu.makeMove(4, 2),
      tu.makeMove(4, 4),
      tu.makeMove(4, 5),
      tu.makeMove(4, 6),
      tu.makeMove(4, 7),

      tu.makeMove(0, 3),
      tu.makeMove(1, 3),
      tu.makeMove(2, 3),
      tu.makeMove(3, 3),
      tu.makeMove(5, 3)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });

  it('should be able to enemy chess piece', function() {
    var board = new ChessBoardRepresentation();
    var queen = new ChessPiecesFactory.Queen(ChessSet.white);
    var pawn = new ChessPiecesFactory.Pawn(ChessSet.black);

    board.select(4, 3).occupyBy(queen);
    board.select(6, 3).occupyBy(pawn);

    var possibleMoves = queen.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(26);

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
      tu.makeMove(0, 7),

      tu.makeMove(4, 0),
      tu.makeMove(4, 1),
      tu.makeMove(4, 2),
      tu.makeMove(4, 4),
      tu.makeMove(4, 5),
      tu.makeMove(4, 6),
      tu.makeMove(4, 7),

      tu.makeMove(0, 3),
      tu.makeMove(1, 3),
      tu.makeMove(2, 3),
      tu.makeMove(3, 3),
      tu.makeMove(5, 3),
      tu.makeMove(6, 3)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });

  it('should not be able to move out of board', function() {
    var board = new ChessBoardRepresentation();
    var queen = new ChessPiecesFactory.Queen(ChessSet.white);

    board.select(0, 0).occupyBy(queen);

    var possibleMoves = queen.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(21);

    var expectedMoves = [
      tu.makeMove(1, 1),
      tu.makeMove(2, 2),
      tu.makeMove(3, 3),
      tu.makeMove(4, 4),
      tu.makeMove(5, 5),
      tu.makeMove(6, 6),
      tu.makeMove(7, 7),

      tu.makeMove(0, 1),
      tu.makeMove(0, 2),
      tu.makeMove(0, 3),
      tu.makeMove(0, 4),
      tu.makeMove(0, 5),
      tu.makeMove(0, 6),
      tu.makeMove(0, 7),

      tu.makeMove(1, 0),
      tu.makeMove(2, 0),
      tu.makeMove(3, 0),
      tu.makeMove(4, 0),
      tu.makeMove(5, 0),
      tu.makeMove(6, 0),
      tu.makeMove(7, 0)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });
});