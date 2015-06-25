var ChessConfig = require('../ChessConfig');


//based on
//http://chessprogramming.wikispaces.com/Simplified+evaluation+function
var pawnTable = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
];

var knightTable = [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
];

var bishopTable = [
    [-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5, 10, 10,  5,  0,-10],
    [-10,  5,  5, 10, 10,  5,  5,-10],
    [-10,  0, 10, 10, 10, 10,  0,-10],
    [-10, 10, 10, 10, 10, 10, 10,-10],
    [-10,  5,  0,  0,  0,  0,  5,-10],
    [-20,-10,-10,-10,-10,-10,-10,-20]
];

var rookTable = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [5, 10, 10, 10, 10, 10, 10,  5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [0,  0,  0,  5,  5,  0,  0,  0]
];


var queenTable = [
    [-20,-10,-10, -5, -5,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5,  5,  5,  5,  0,-10],
    [-5,  0,  5,  5,  5,  5,  0, -5],
    [0,  0,  5,  5,  5,  5,  0, -5],
    [-10,  5,  5,  5,  5,  5,  0,-10],
    [-10,  0,  5,  0,  0,  0,  0,-10],
    [-20,-10,-10, -5, -5,-10,-10,-20]
];

var pieceImportance = function (piece) {
    var row = !piece.set.isWhite()? piece.field.row : ChessConfig.BOARD_SIZE - 1 - piece.field.row;
    var col = piece.set.isWhite()? piece.field.col : ChessConfig.BOARD_SIZE - 1 - piece.field.col;

    switch (piece.name) {
        case 'pawn' :
            return 100 + pawnTable[row][col];
        case 'knight' :
            return 320 + knightTable[row][col];
        case 'bishop' :
            return 330 + bishopTable[row][col];
        case 'rook' :
            return 500 + rookTable[row][col];
        case 'queen' :
            return 900 + queenTable[row][col];
        default :
            throw new Error('Unknown chess piece');
    }
};

module.exports = function (player) {
    //manual curring...
    return function(state) {
        //refactor
        var hasOwnKing = false;
        var myScore = state.getPiecesForSet(player).reduce(function (a, piece) {
            if (piece.name == 'king') {
                hasOwnKing = true;
                return a;
            }

            return a + pieceImportance(piece);
        },0);

        if (!hasOwnKing) {
            return Number.MIN_VALUE;
        }
        var hasEnemyKing = false;

        var enemyScore = state.getPiecesForSet(player.getEnemy()).reduce(function (a, piece) {
            if (piece.name == 'king') {
                hasEnemyKing = true;
                return a;
            }

            return a + pieceImportance(piece);
        }, 0);

        if (!hasEnemyKing) {
            return Number.MAX_VALUE;
        }

        return myScore - enemyScore;
    };
};