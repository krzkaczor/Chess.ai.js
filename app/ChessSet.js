var ChessSet = function(chessSet) {
  if (chessSet != 'w' && chessSet != 'b') {
    throw new Error('Illegal chess set');
  }

  this.setName = chessSet;
};

ChessSet.prototype = {
  isWhite : function() {
    return this.setName == 'w';
  },

  isBlack : function() {
    return this.setName == 'b';
  },

  /**
   * Checks if set is enemy of other set
   * @param otherSet
   * @returns {boolean}
   */
  isEnemyOf : function(otherSet) {
    return this.setName !== otherSet.setName;
  },

  isFriendOf : function(otherSet) {
    return this.setName === otherSet.setName;
  }
};

module.exports = {
  white: new ChessSet('w'),
  black: new ChessSet('b')
}