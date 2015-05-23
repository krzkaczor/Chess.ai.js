var expect = require('chai').expect;
var _ = require('lodash');
var tu = require('../TestUtils');
var ChessBoardRepresentation = require('../../app/Chessboard/ChessBoardRepresentation');
var ChessPiecesFactory = require('../../app/ChessPiecesFactory')();
var ChessSet = require('../../app/ChessSet');


describe('Knight', function() {
  it('should move on board', function() {
    var board = new ChessBoardRepresentation();
    var knight = new ChessPiecesFactory.Knight(ChessSet.white);

    board.select(4, 4).occupyBy(knight);

    var possibleMoves = knight.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(8);

    var expectedMoves = [
      tu.makeMove(6, 5),
      tu.makeMove(6, 3),
      tu.makeMove(2, 5),
      tu.makeMove(2, 3),
      tu.makeMove(5, 6),
      tu.makeMove(5, 2),
      tu.makeMove(3, 6),
      tu.makeMove(3, 2)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });


  it('should not be able to beat friendly chess piece', function() {
    var board = new ChessBoardRepresentation();
    var knight = new ChessPiecesFactory.Knight(ChessSet.white);
    var pawn = new ChessPiecesFactory.Pawn(ChessSet.white);

    board.select(4, 4).occupyBy(knight);
    board.select(3, 2).occupyBy(pawn);

    var possibleMoves = knight.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(7);

    var expectedMoves = [
      tu.makeMove(6, 5),
      tu.makeMove(6, 3),
      tu.makeMove(2, 5),
      tu.makeMove(2, 3),
      tu.makeMove(5, 6),
      tu.makeMove(5, 2),
      tu.makeMove(3, 6)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });

  it('should not be able to beat friendly chess piece', function() {
    var board = new ChessBoardRepresentation();
    var knight = new ChessPiecesFactory.Knight(ChessSet.white);
    var pawn = new ChessPiecesFactory.Pawn(ChessSet.black);

    board.select(4, 4).occupyBy(knight);
    board.select(3, 2).occupyBy(pawn);

    var possibleMoves = knight.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(8);

    var expectedMoves = [
      tu.makeMove(6, 5),
      tu.makeMove(6, 3),
      tu.makeMove(2, 5),
      tu.makeMove(2, 3),
      tu.makeMove(5, 6),
      tu.makeMove(5, 2),
      tu.makeMove(3, 6),
      tu.makeMove(3, 2)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });

  it('should not be able to jump out of board', function() {
    var board = new ChessBoardRepresentation();
    var knight = new ChessPiecesFactory.Knight(ChessSet.white);

    board.select(0, 0).occupyBy(knight);

    var possibleMoves = knight.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(2);

    var expectedMoves = [
      tu.makeMove(1, 2),
      tu.makeMove(2, 1)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });
});