var Player = function (set) {
  this.set = set;
};

/**
 * Notify that it is player's turn
 * @param callback
 */
Player.prototype.playerTurn = function (callback) {
  throw new Error("Unimplemented");
};

/**
 * Notifies about enemy move
 * @param move
 */
Player.prototype.playerMove = function() {
  throw new Error("Unimplemented");
};

module.exports = Player;