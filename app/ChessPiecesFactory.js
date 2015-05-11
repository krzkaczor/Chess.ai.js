module.exports = function () {
  var ChessPiece = function(name) {
    this.name = name;
  };

  ChessPiece.prototype.toFenNotation = function() {
    return this.name[0];
  };

  var Empty = function() {};
  Empty.prototype = new ChessPiece('empty');
  Empty.prototype.toFenNotation = function() {
    return '';
  };

  var Pawn = function() {};
  Pawn.prototype = new ChessPiece('pawn');

  var Rook = function() {};
  Rook.prototype = new ChessPiece('rook');

  var Knight = function() {};
  Knight.prototype = new ChessPiece('knight');
  Knight.prototype.toFenNotation = function() {
    return 'n'
  };

  var Bishop = function() {};
  Bishop.prototype = new ChessPiece('bishop');

  var Queen = function() {};
  Queen.prototype = new ChessPiece('queen');

  var King = function() {};
  King.prototype = new ChessPiece('king');

  return {
    makeEmpty: function () {
      return new Empty();
    },

    makePawn: function () {
      return new Pawn();
    },

    makeRook: function () {
      return new Rook();
    },

    makeKnight: function() {
      return new King();
    },

    makeBishop: function() {
      return new Bishop();
    },

    makeQueen: function() {
      return new Queen();
    },

    makeKing: function() {
      return new King();
    }
  };
};