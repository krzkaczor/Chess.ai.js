var expect = require('chai').expect;
var _ = require('lodash');
var tu = require('../TestUtils');
var ChessBoardRepresentation = require('../../app/Chessboard/ChessBoardRepresentation');
var ChessPiecesFactory = require('../../app/ChessPiecesFactory');
var ChessSet = require('../../app/ChessSet');

describe('Rook', function() {

  it('should move on board', function() {
    var board = new ChessBoardRepresentation();
    var rook = new ChessPiecesFactory.Rook(ChessSet.white);
    var pawn = new ChessPiecesFactory.Pawn(ChessSet.white);

    board.select(0, 0).occupyBy(rook);
    board.select(0, 5).occupyBy(pawn);

    var possibleMoves = rook.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(11);

    var expectedMoves = [
      tu.makeMove(1, 0),
      tu.makeMove(2, 0),
      tu.makeMove(3, 0),
      tu.makeMove(4, 0),
      tu.makeMove(5, 0),
      tu.makeMove(6, 0),
      tu.makeMove(7, 0),
      tu.makeMove(0, 1),
      tu.makeMove(0, 2),
      tu.makeMove(0, 3),
      tu.makeMove(0, 4)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });


  it('should allow to beat enemy', function() {
    var board = new ChessBoardRepresentation();
    var rook = new ChessPiecesFactory.Rook(ChessSet.white);
    var pawn1 = new ChessPiecesFactory.Pawn(ChessSet.black);
    var pawn2 = new ChessPiecesFactory.Pawn(ChessSet.black);

    board.select(0, 0).occupyBy(rook);
    board.select(0, 1).occupyBy(pawn1);
    board.select(1, 0).occupyBy(pawn2);

    var possibleMoves = rook.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(2);

    var expectedMoves = [
      tu.makeMove(1, 0),
      tu.makeMove(0, 1)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  })
});