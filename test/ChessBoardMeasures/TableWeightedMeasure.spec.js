var expect = require('chai').expect;

var tu = require('../TestUtils');
var ChessSet = require('../../app/ChessSet');
var ChessBoardRepresentation = require('../../app/ChessBoard/ChessBoardRepresentation');
var ChessPiecesFactory = require('../../app/ChessPiecesFactory');

var Measure = require('../../app/ChessBoardMeasures/TableWeightedMeasure');

describe('Table weighted measure', function () {
    it('should calculate score correctly', function () {
        var board = tu.generateBasicGameState();

        board.select(1, 0).occupyBy(board.register(new ChessPiecesFactory.Pawn(ChessSet.white)));
        board.select(1, 2).occupyBy(board.register(new ChessPiecesFactory.Queen(ChessSet.white)));
        board.select(2, 1).occupyBy(board.register(new ChessPiecesFactory.Pawn(ChessSet.black)));
        board.setInControl = ChessSet.black;

        var measure = new Measure(ChessSet.white);
        var score = measure(board);

        expect(score).to.be.equal(100+900+5+5 - (100 + 10));
    });
});