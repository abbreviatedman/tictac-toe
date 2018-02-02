var appMethods = {
  toggleAbout: function () {
    this.showAbout = !this.showAbout;
    this.aboutButtonCopy = this.showAbout
      ? 'Close About Section'
      : 'About TicTac Toe';
  },

  spaceNumber: function(row, col) {
    var index = row * 3 + col;
    return index;
  },

  spaceContent: function(row, col) {
    return this.board[this.spaceNumber(row, col)];
  },

  image: function (row, col) {
    var content = this.spaceContent(row, col);
    switch(content) {
    case 'X':
      return this.ticTacUri;
    case 'O':
      return this.toeUri;
    default:
      return '';
    }
  },

  submit: function (row, col) {
    this.gameMessage = this.horizontalLine;

    var index = this.spaceNumber(row, col);
    var board = this.board;
    var isXTurn = this.isXTurn;
    var char = isXTurn ? 'X' : 'O';

    if (this.gameIsOver) {
      this.gameMessage = 'The game is over, but you can start again!';
      return;
    }

    if (board[index] !== ' ') {
      this.gameMessage = 'That\'s not a valid spot!';
      return;
    }

    Vue.set(this.board, index, char);
    this.isXTurn = !isXTurn;

    var someoneWon = this.checkWinPossibilities(board, index, char, col);
    var gameEndedInTie = this.didWeTie();

    if (someoneWon) {
      this.gameIsOver = true;
      var winner = char === 'X' ? 'Tic Tac' : 'Toe';
      this.gameMessage = 'Game over! ' + winner + ' won!';
    } else if (gameEndedInTie) {
      this.gameIsOver = true;
      this.gameMessage = 'Game over! Another boring tie!';
    }
  },

  resetGame: function () {
    this.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    this.isXTurn = true;
    this.gameIsOver = false;
    this.showAbout = false;
    this.gameMessage = this.horizontalLine;
  },

  checkWinPossibilities: function (board, index, char, col) {
    var upOneMatches = board[index - 3] === char;
    var downOneMatches = board[index + 3] === char;
    var leftOneMatches = board[index - 1] === char
      && col > 0;
    var rightOneMatches = board[index + 1] === char
      && col < 2;

    var upTwoMatches = board[index - 6] === char;
    var downTwoMatches = board[index + 6] === char;
    var leftTwoMatches = board[index - 2] === char
      && col === 2;
    var rightTwoMatches = board[index + 2] === char
      && col === 0;

    var upOneAndLeftOneMatches = board[index - 4] === char
      && (index === 4 || index === 8);
    var upOneAndRightOneMatches = board[index - 2] === char
      && (index === 4 || index === 6);
    var downOneAndLeftOneMatches = board[index + 2] === char
      && (index === 4 || index === 2);
    var downOneAndRightOneMatches = board[index + 4] === char
      && (index === 4 || index === 0);

    var upTwoAndLeftTwoMatches = board[0] === char
      && index === 8;
    var upTwoAndRightTwoMatches = board[2] === char
      && index === 6;
    var downTwoAndLeftTwoMatches = board[6] === char
      && index === 2;
    var downTwoAndRightTwoMatches = board[8] === char
      && index === 0;

    var someoneWon = upOneMatches && upTwoMatches
      || upOneMatches && downOneMatches
      || downOneMatches && downTwoMatches
      || leftOneMatches && leftTwoMatches
      || leftOneMatches && rightOneMatches
      || rightOneMatches && rightTwoMatches
      || upOneAndLeftOneMatches && upTwoAndLeftTwoMatches
      || upOneAndLeftOneMatches && downOneAndRightOneMatches
      || downOneAndRightOneMatches && downTwoAndRightTwoMatches
      || upOneAndRightOneMatches && upTwoAndRightTwoMatches
      || upOneAndRightOneMatches && downOneAndLeftOneMatches
      || downOneAndLeftOneMatches && downTwoAndLeftTwoMatches;

    return someoneWon;
  },

  didWeTie: function () {
    return !this.board.includes(' ');
  }
};
