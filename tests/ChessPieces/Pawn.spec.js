var expect = require('chai').expect;
var _ = require('lodash');
var tu = require('../TestUtils');
var ChessBoardRepresentation = require('../../app/Chessboard/ChessBoardRepresentation');
var ChessPiecesFactory = require('../../app/ChessPiecesFactory')();
var ChessSet = require('../../app/ChessSet');

describe('Pawn', function() {

  it('should move on board', function() {
    var board = new ChessBoardRepresentation();
    var pawn = new ChessPiecesFactory.Pawn(ChessSet.white);

    board.select(1, 2).occupyBy(pawn);

    var possibleMoves = pawn.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(2);

    var expectedMoves = [
      tu.makeMove(2, 2),
      tu.makeMove(3, 2)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  });


  it('should be able to beat enemy', function() {
    var board = new ChessBoardRepresentation();
    var pawn = new ChessPiecesFactory.Pawn(ChessSet.white);
    var enemy1 = new ChessPiecesFactory.Pawn(ChessSet.black);
    var enemy2 = new ChessPiecesFactory.Pawn(ChessSet.black);

    board.select(1, 1).occupyBy(pawn);
    board.select(2, 2).occupyBy(enemy1);
    board.select(2, 0).occupyBy(enemy2);

    var possibleMoves = pawn.generateAllPossibleMoves();

    expect(possibleMoves.length).to.be.equal(4);

    var expectedMoves = [
      tu.makeMove(2, 1),
      tu.makeMove(3, 1),
      tu.makeMove(2, 2),
      tu.makeMove(2, 0)
    ];

    expect(tu.checkMoves(possibleMoves, expectedMoves)).to.be.true;
  })
});