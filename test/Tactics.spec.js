var expect = require('chai').expect;
var _ = require('lodash');
var tu = require('./TestUtils');
var ChessBoardRepresentation = require('../app/Chessboard/ChessBoardRepresentation');
var ChessPiecesFactory = require('../app/ChessPiecesFactory');
var ChessSet = require('../app/ChessSet');
var ChessAi = require('../app/Chess.ai');

/**
 Test cases to check AI behaviour in specific situations
 */
describe('Tactics: AlphaBeta', function () {
  it('should prefer to beat enemy', function () {
    var board = tu.generateBasicGameState();

    board.select(0, 0).occupyBy(board.register(new ChessPiecesFactory.Pawn(ChessSet.white)));
    board.select(2, 1).occupyBy(board.register(new ChessPiecesFactory.Pawn(ChessSet.black)));

    var chessAi = new ChessAi({initialState: board});
    var strMove = {
      source: tu.moveToStringNotation(tu.makeMove(0, 0)),
      target: tu.moveToStringNotation(tu.makeMove(1, 0))
    };
    chessAi.makeMove(strMove);
    var state = chessAi.board;

    expect(state.blackPieces.length).to.be.eql(2);
    expect(state.whitePieces.length).to.be.eql(1);
  });

  it('should prefer to beat more valuable enemy', function () {
    var board = tu.generateBasicGameState();

    board.select(0, 0).occupyBy(board.register(new ChessPiecesFactory.Pawn(ChessSet.white)));
    board.select(1, 2).occupyBy(board.register(new ChessPiecesFactory.Queen(ChessSet.white)));
    board.select(2, 1).occupyBy(board.register(new ChessPiecesFactory.Pawn(ChessSet.black)));

    var chessAi = new ChessAi({initialState: board});
    var strMove = {
      source: tu.moveToStringNotation(tu.makeMove(0, 0)),
      target: tu.moveToStringNotation(tu.makeMove(1, 0))
    };
    chessAi.makeMove(strMove);
    var state = chessAi.board;

    expect(state.blackPieces.length).to.be.eql(2);
    expect(state.whitePieces.length).to.be.eql(2);
    expect(state.toFenNotation()).to.be.eql("4k3/8/8/8/8/8/P1p5/4K3");
  });

  it('should avoid being beaten', function () {
    var board = tu.generateBasicGameState();

    board.select(1, 0).occupyBy(board.register(new ChessPiecesFactory.Rook(ChessSet.white)));
    board.select(3, 3).occupyBy(board.register(new ChessPiecesFactory.Pawn(ChessSet.black)));

    var chessAi = new ChessAi({initialState: board});
    var strMove = {
      source: tu.moveToStringNotation(tu.makeMove(1, 0)),
      target: tu.moveToStringNotation(tu.makeMove(2, 0))
    };
    chessAi.makeMove(strMove);
    var state = chessAi.board;


    expect(state.blackPieces.length).to.be.eql(2);
    expect(state.whitePieces.length).to.be.eql(2);
    expect(state.blackPieces[1].row).not.to.be.eql(2);
  });

  it('should maximize score', function () {
    var board = tu.generateBasicGameState();

    board.select(1, 0).occupyBy(board.register(new ChessPiecesFactory.Pawn(ChessSet.white)));
    board.select(1, 1).occupyBy(board.register(new ChessPiecesFactory.Pawn(ChessSet.white)));
    board.select(1, 2).occupyBy(board.register(new ChessPiecesFactory.Pawn(ChessSet.white)));
    board.select(1, 3).occupyBy(board.register(new ChessPiecesFactory.Pawn(ChessSet.white)));
    board.select(0, 1).occupyBy(board.register(new ChessPiecesFactory.Bishop(ChessSet.white)));
    board.select(0, 2).occupyBy(board.register(new ChessPiecesFactory.Bishop(ChessSet.white)));
    board.select(3, 3).occupyBy(board.register(new ChessPiecesFactory.Pawn(ChessSet.white)));

    board.select(0, 0).occupyBy(board.register(new ChessPiecesFactory.Rook(ChessSet.black)));

    var chessAi = new ChessAi({
      strategy: 'alphabeta',
      initialState: board
    });
    var strMove = {
      source: tu.moveToStringNotation(tu.makeMove(3, 3)),
      target: tu.moveToStringNotation(tu.makeMove(4, 3))
    };
    chessAi.makeMove(strMove);
    var state = chessAi.board;
    console.log("\n " + state.toFenNotation());
    expect(state.whitePieces.length).to.be.eql(7);
    expect(state.blackPieces.length).to.be.eql(2);

    chessAi.makeMove({
      source: tu.moveToStringNotation(tu.makeMove(4, 3)),
      target: tu.moveToStringNotation(tu.makeMove(5, 3))
    });
    state = chessAi.board;

    expect(state.whitePieces.length).to.be.eql(6);
    expect(state.blackPieces.length).to.be.eql(2);
    console.log("\n " + state.toFenNotation());
  });


});