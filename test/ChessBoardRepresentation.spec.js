var expect = require('chai').expect;
var _ = require('lodash');
var tu = require('./TestUtils');
var ChessBoardRepresentation = require('../app/Chessboard/ChessBoardRepresentation');
var ChessPiecesFactory = require('../app/ChessPiecesFactory')();
var ChessSet = require('../app/ChessSet');

describe('ChessBoardRepresentation', function() {

  it('should create starting population', function () {
    var board = ChessBoardRepresentation.startingPopulation();

    expect(board.setInControl).to.be.equal(ChessSet.white);
    expect(board.whitePieces.length).to.be.equal(16);
    expect(board.blackPieces.length).to.be.equal(16);

    expect(board.toFenNotation()).to.be.equal("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
  });

  it('should clone chessboard', function() {
    var parentBoard = ChessBoardRepresentation.startingPopulation();

    var clonedBoard = parentBoard.deepCopy();
    expect(clonedBoard.setInControl).to.be.equal(ChessSet.white); //cloning should not change set in control
    expect(clonedBoard.whitePieces.length).to.be.equal(16);
    expect(clonedBoard.blackPieces.length).to.be.equal(16);

    expect(clonedBoard.toFenNotation()).to.be.equal("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
  });

  it('should be immutable', function() {
    var board = ChessBoardRepresentation.startingPopulation();

    var newBoard = board.makeMove({source: tu.makeMove(1,1), target: tu.makeMove(3,1)});

    expect(newBoard).not.to.be.equal(board);
    expect(newBoard.setInControl).to.be.equal(ChessSet.black);

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

    expect(newBoard.setInControl).to.be.equal(ChessSet.black);
    expect(newBoard.blackPieces.length).to.be.equal(0);
  });

  it('should recognise check', function() {
    var state = tu.generateBasicGameState();
    state.select(5, 4).occupyBy(state.register(new ChessPiecesFactory.Queen(ChessSet.white)));

    expect(state.isCheck(ChessSet.black)).to.be.true;
    expect(state.isCheckMate(ChessSet.black)).to.be.false;

    expect(state.isCheck(ChessSet.white)).to.be.false;
    expect(state.isCheckMate(ChessSet.white)).to.be.false;
  });

  it('should recognise checkmate', function() {
    var state = tu.generateBasicGameState();
    state.select(6, 4).occupyBy(state.register(new ChessPiecesFactory.Queen(ChessSet.white)));
    state.select(5, 4).occupyBy(state.register(new ChessPiecesFactory.Queen(ChessSet.white)));

    expect(state.isCheck(ChessSet.black)).to.be.true;
    expect(state.isCheckMate(ChessSet.black)).to.be.true;

    expect(state.isCheck(ChessSet.white)).to.be.false;
    expect(state.isCheckMate(ChessSet.white)).to.be.false;
  });
});