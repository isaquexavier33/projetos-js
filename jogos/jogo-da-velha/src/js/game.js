// TIC TAC TOE (Jogo da Velha)
const ticTacToe = {
  // PROPERTIES
  board: ["", "", "", "", "", "", "", "", ""],
  symbols: {
    options: {
      IAM: "\u{3007}",
      IA: "\u{2715}",
    },
    turnIndex: "IAM",
    changePlayerAtOnce() {
      this.turnIndex = this.turnIndex === "IAM" ? "IA" : "IAM";
    },
  },
  containerElement: null,
  gameOver: false,
  winningSequences: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],

  // FUNCTIONS

  init(container) {
    this.containerElement = container;
  },

  makePlay(position) {
    if (this.gameOver || this.isGameOver() || this.board[position] !== "")
      return false;

    const currentSymbol = this.symbols.options[this.symbols.turnIndex];
    this.board[position] = currentSymbol;
    this.drawOnBoard();

    const winningSequencesIndex = this.checkWinningSequences(currentSymbol);
    if (this.isGameOver() && winningSequencesIndex < 0) {
      this.gameIsOver();
    } else if (winningSequencesIndex >= 0) {
      this.gameIsOver(currentSymbol);
      this.styleWinningSequence(this.winningSequences[winningSequencesIndex]);
    } else {
      this.symbols.changePlayerAtOnce();
    }
    if (this.symbols.turnIndex === "IA") {
      this.dispatchIA();
    }
    return true;
  },

  dispatchIA() {
    const allPositionEnabled = this.board.reduce((before, current, index) => {
      if (current === "") {
        before.push(index);
      }

      return before;
    }, []);

    const random = parseInt(Math.random() * (allPositionEnabled.length - 1));
    this.makePlay(allPositionEnabled[random]);
  },

  styleWinningSequence(winningSequence) {
    winningSequence.forEach((position) => {
      this.containerElement
        .querySelector(`div:nth-child(${position + 1})`)
        .classList.add("winner");
    });
  },

  gameIsOver(symbol = undefined) {
    this.gameOver = true;
    setTimeout(() => {
      if (!symbol) {
        alert("No winner! Click in restart button to play again");
        return;
      }
      alert(`Player ${symbol} won !!! Click in restart button to play again`);
      return;
    }, 10);
  },

  isGameOver() {
    // When everything is fully filled, the game is over
    return !this.board.includes("");
  },

  start() {
    this.board.fill("");
    this.drawOnBoard();
    this.gameOver = false;
  },

  restart() {
    if (this.isGameOver() || this.gameOver) {
      this.start();
      console.log("this game has been restarted!");
    } else if (confirm("Are you sure you want to restart this game?")) {
      this.start();
      console.log("this game has been restarted!");
    }
  },

  checkWinningSequences(symbol) {
    for (i in this.winningSequences) {
      if (
        this.board[this.winningSequences[i][0]] == symbol &&
        this.board[this.winningSequences[i][1]] == symbol &&
        this.board[this.winningSequences[i][2]] == symbol
      ) {
        console.log(`winning sequences INDEX: ${i}`);
        return i;
      }
    }
    return -1;
  },

  drawOnBoard() {
    this.containerElement.innerHTML = this.board
      .map(
        (element, index) =>
          `<div onclick="ticTacToe.makePlay('${index}')"> ${element} </div>`
      )
      .reduce((content, current) => content + current);
  },
};
