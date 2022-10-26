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
    const isWinner = () => {
        checkRows();
        checkColumns();
        checkDiagonals();
        if (board.every(cell => cell)) console.log('tie');
    }

    // check rows
    const checkRows = () => {
        if (board[0] && board[1] && board[2]) {
            if (board[0] === board[1] && board[1] === board[2]) console.log("row one"); 
        };
        if (board[3] && board[4] && board[5]) {
            if (board[3] === board[4] && board[4] === board[5]) console.log("row two");
        }
        if (board[6] && board[7] && board[8]) {
            if (board[6] === board[7] && board[7] === board[8]) console.log("row three");
        }
    }

    // check columns
    const checkColumns = () => {
        if (board[0] && board[3] && board[6]) {
            if (board[0] === board[3] && board[3] === board[6]) console.log("column one"); 
        };
        if (board[1] && board[4] && board[7]) {
            if (board[1] === board[4] && board[4] === board[7]) console.log("column two");
        }
        if (board[2] && board[5] && board[8]) {
            if (board[2] === board[5] && board[5] === board[8]) console.log("column three");
        }
    }

    // check diagnonals
    const checkDiagonals = () => {
        if (board[0] && board[4] && board[8]) {
            if (board[0] === board[4] && board[4] === board[8]) console.log("left"); 
        }
        if (board[2] && board[4] && board[6]) {
            if (board[2] === board[4] && board[4] === board[6]) console.log("right"); 
        }
    }


    // place marker
    const placeMarker = (index) => {
        if (gameboard.board[index] === '') {
            gameboard.updateBoard(index, currentPlayer.marker);
            displayController.updateBoard();
            board = gameboard.board;
            isWinner();
            swapPlayer();
        }
    }

    return {
        placeMarker,
        startGame,
    }
})();

gameLogic.startGame();