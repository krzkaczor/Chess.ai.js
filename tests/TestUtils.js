module.exports = {
  makeMove: function (row, col) {
    return {row: row, col: col};
  },
  /**
   * Move can have more properties than only row and col.
   * @param actual
   * @param expected
   * @returns {boolean}
   */
  checkMoves: function (actual, expected) {
    if (actual.length != expected.length)
      return false;

    for (var i = 0; i < actual.length; i++) {

      var searched = actual[i];
      var foundMatch = false;
      for (var j = 0; j < expected.length; j++) {
        var checked = expected[j];
        if (searched.row == checked.row && searched.col == checked.col) {
          foundMatch = true;
          break;
        }
      }
      if (!foundMatch) {
        return false;
      }
    }
    return true;
  }
};