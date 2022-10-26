const gameboard = (() => {
    // gameboard array
    const board = ['', '', '', '', '', '', '', '', ''];

    // update array
    const updateBoard = (index, marker) => {
        board.splice(index, 1, marker);
    }

    return {
        board,
        updateBoard,
    }
})();

const Player = (playerName, marker) => {
    return { 
        playerName, 
        marker, 
    }
}

// needs access to: board, players, winstate
const displayController = (() => {
    const cells = document.querySelectorAll('.cell');
    // draw the gameboard
    const initializeBoard = () => {
        for (i = 0; i < cells.length; i++) {
            // get the index of the cell
            let cell = cells.item(i);
            let index = i;
            // append content to the cell according to corresponding index of board
            cell.addEventListener('click', () => gameLogic.placeMarker(index));
        };
    };

    // draw players

    // update gameboard
    const updateBoard = () => {
        for (i = 0; i < cells.length; i++) {
            // get the index of the cell
            let cell = cells.item(i);
            // append content to the cell according to corresponding index of board
            cell.textContent = gameboard.board[i];
        }
    }

    // display win message

    // add replay button

    // reset gameboard

    return {
        initializeBoard,
        updateBoard,
    }

})();


// needs access to: board, players
const gameLogic = (() => {
    let board = gameboard.board;
    let player1 = Player('one', 'X');
    let player2 = Player('two', 'O');

    let currentPlayer = player1;

    // start game
    const startGame = () => {
        displayController.initializeBoard(board);
    }

    // swap player
    const swapPlayer = () => {
        if (currentPlayer === player1) currentPlayer = player2;
        else currentPlayer = player1;
    }

    // determine win / tie

    // place marker
    const placeMarker = (index) => {
        if (gameboard.board[index] === '') {
            gameboard.updateBoard(index, currentPlayer.marker);
            displayController.updateBoard();
            swapPlayer();
        }
    }

    return {
        placeMarker,
        startGame,
    }
})();

gameLogic.startGame();