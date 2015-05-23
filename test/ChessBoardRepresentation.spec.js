var expect = require('chai').expect;
var _ = require('lodash');
var tu = require('./TestUtils');
var ChessBoardRepresentation = require('../app/Chessboard/ChessBoardRepresentation');
var ChessPiecesFactory = require('../app/ChessPiecesFactory')();
var ChessSet = require('../app/ChessSet');

describe('ChessBoardRepresentation', function() {

  it('should create starting population', function () {
    var board = ChessBoardRepresentation.startingPopulation();

    expect(board.whitePieces.length).to.be.equal(16);
    expect(board.blackPieces.length).to.be.equal(16);

    expect(board.toFenNotation()).to.be.equal("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
  });

  it('should clone chessboard', function() {
    var parentBoard = ChessBoardRepresentation.startingPopulation();

    var clonedBoard = parentBoard.deepCopy();
    expect(clonedBoard.whitePieces.length).to.be.equal(16);
    expect(clonedBoard.blackPieces.length).to.be.equal(16);

    expect(clonedBoard.toFenNotation()).to.be.equal("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
  });

  it('should be immutable', function() {
    var board = ChessBoardRepresentation.startingPopulation();

    var newBoard = board.makeMove({source: tu.makeMove(1,1), target: tu.makeMove(3,1)});

    expect(newBoard).not.to.be.equal(board);

    //each field of old board should point to old
    var chessBoardSize = 8;
    for (var i = 0;i < chessBoardSize; i++) {
      for(var j = 0;j < chessBoardSize; j++) {
        var field = board.board[i][j];
        expect(field.board).to.be.equal(board);
        if (!field.isEmpty()) {
          expect(field.chessPiece.field).to.be.equal(field);
        }
      }
    }

    //each field of new board should point to new
    for (i = 0;i < chessBoardSize; i++) {
      for(j = 0;j < chessBoardSize; j++) {
        field = newBoard.board[i][j];
        expect(field.board).to.be.equal(newBoard);
        if (!field.isEmpty()) {
          expect(field.chessPiece.field).to.be.equal(field);
        }
      }
    }

    expect(newBoard.toFenNotation()).to.be.equal("rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR");
  });

  it('should generate all possible moves for game state', function() {
    var board = new ChessBoardRepresentation();
    var whitePawn = new ChessPiecesFactory.Pawn(ChessSet.white);
    var blackPawn = new ChessPiecesFactory.Pawn(ChessSet.black);

    board.select(1, 0).occupyBy(board.register(whitePawn));
    board.select(6, 0).occupyBy(board.register(blackPawn));

    var whiteMoves = board.generateAllPossibleMovesForSet(ChessSet.white);
    var blackMoves = board.generateAllPossibleMovesForSet(ChessSet.black);

    expect(whiteMoves.length).to.be.equal(2);
    expect(board.makeMove(whiteMoves[0]).toFenNotation()).to.be.equal("8/p7/8/8/8/P7/8/8");
    expect(board.makeMove(whiteMoves[1]).toFenNotation()).to.be.equal("8/p7/8/8/P7/8/8/8");

    expect(blackMoves.length).to.be.equal(2);
    expect(board.makeMove(blackMoves[0]).toFenNotation()).to.be.equal("8/8/p7/8/8/8/P7/8");
    expect(board.makeMove(blackMoves[1]).toFenNotation()).to.be.equal("8/8/8/p7/8/8/P7/8");
  });

  it('should allow to beat enemy', function() {
    var board = new ChessBoardRepresentation();
    var whitePawn = new ChessPiecesFactory.Pawn(ChessSet.white);
    var blackPawn = new ChessPiecesFactory.Pawn(ChessSet.black);

    board.select(1, 0).occupyBy(board.register(whitePawn));
    board.select(2, 1).occupyBy(board.register(blackPawn));

    var newBoard = board.makeMove({
      source: tu.makeMove(1, 0),
      target: tu.makeMove(2, 1)
    });

    expect(newBoard.blackPieces.length).to.be.equal(0);
  })
});