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
    const announceWinner = () => {
        console.log(gameLogic.currentPlayer.playerName);
        // const outcome = document.querySelector('.outcome');
        // switch (winner) {
        //     case 'tie':
        //         outcome.textContent = `It's a tie!`
        //         outcome.classList.toggle('.accent');
        //         break;
        
        //     default:
        //         outcome.textContent = `${gameLogic.currentPlayer.playerName} wins!`;
        //         break;
        // }
        // const gameover = document.querySelector('.gameover');
        // gameover.classList.add('active');
    }

    // add replay button

    // reset gameboard

    return {
        initializeBoard,
        updateBoard,
        announceWinner,
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
        if (currentPlayer === player1) {
            currentPlayer = player2;
            console.log(currentPlayer.playerName);
            return currentPlayer;
        } else {
            currentPlayer = player1;
            console.log(currentPlayer.playerName);
            return currentPlayer;
    }
}

    // determine win / tie
    const isWinner = () => {
        checkRows();
        checkColumns();
        checkDiagonals();
        if (board.every(cell => cell)) endGame('tie');
    }

    // check rows
    const checkRows = () => {
        if (board[0] && board[1] && board[2]) {
            if (board[0] === board[1] && board[1] === board[2]) endGame(); 
        };
        if (board[3] && board[4] && board[5]) {
            if (board[3] === board[4] && board[4] === board[5]) endGame();
        }
        if (board[6] && board[7] && board[8]) {
            if (board[6] === board[7] && board[7] === board[8]) endGame();
        }
    }

    // check columns
    const checkColumns = () => {
        if (board[0] && board[3] && board[6]) {
            if (board[0] === board[3] && board[3] === board[6]) endGame(); 
        };
        if (board[1] && board[4] && board[7]) {
            if (board[1] === board[4] && board[4] === board[7]) endGame();
        }
        if (board[2] && board[5] && board[8]) {
            if (board[2] === board[5] && board[5] === board[8]) endGame();
        }
    }

    // check diagnonals
    const checkDiagonals = () => {
        if (board[0] && board[4] && board[8]) {
            if (board[0] === board[4] && board[4] === board[8]) endGame(); 
        }
        if (board[2] && board[4] && board[6]) {
            if (board[2] === board[4] && board[4] === board[6]) endGame();
        }
    }

    const endGame = () => {
        disableBoard();
        displayController.announceWinner();
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

    const disableBoard = () => {
        board.forEach((cell) => {
            if (board.cell === '') board.cell = ' ';
        })
    }

    return {
        placeMarker,
        startGame,
        currentPlayer,
    }
})();

gameLogic.startGame();

// start game button should:
// - properly input player name
// - properly input player marker (get both marker radio buttons; checked = player1, unchecked = player2);
// start game normally

// current bug: why the fuck do you always print out player one