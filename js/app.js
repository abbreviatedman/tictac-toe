new Vue({
  el: '.app',
  data: {
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    selection: 10,
    isXTurn: true
  },
  methods: {
    submit: function () {
      const index = Number(this.selection);
      if (index >= 0 && index <= 8 && index === this.board[index]) {
        this.board[index] = this.isXTurn ? 'X' : 'O';
        this.isXTurn = !this.isXTurn;
      }
      console.log(this.board);
    },
    checkWinConditions: function () {
      const char = this.isXTurn ? 'X' : 'O';

    }
  }
});
