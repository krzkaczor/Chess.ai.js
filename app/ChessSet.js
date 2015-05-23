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
  },

  /**
   * Returns enemy set
   * @returns {ChessSet}
   */
  getEnemy : function() {
    return this.isWhite()? sets.black : sets.white;
  }
};

var sets = {
  white: new ChessSet('w'),
  black: new ChessSet('b')
};


module.exports = sets;