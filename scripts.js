const gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    const updateBoard = (index, marker) => {
        board.splice(index, 1, marker);
    }

    return {
        board,
        updateBoard,
    }
})();

const Player = (playerName, marker, id) => {
    return { 
        playerName, 
        marker,
        id,
    }
}

const displayController = (() => {
    const cells = document.querySelectorAll('.cell');
    const initializeBoard = () => {
        for (i = 0; i < cells.length; i++) {
            let cell = cells.item(i);
            let index = i;
            cell.addEventListener('click', () => gameLogic.placeMarker(index));
        };
    };

    const updateBoard = () => {
        for (i = 0; i < cells.length; i++) {
            let cell = cells.item(i);
            cell.textContent = gameboard.board[i];
        }
    }

    const deactivateBoard = () => {
        for (i = 0; i < cells.length; i++) {
            let cell = cells.item(i);
            cell.removeEventListener('click', () => gameLogic.placeMarker(index));
        }
    }

    // display win message
    const announceWinner = (winner) => {
        if (winner.id === 1) console.log('one');
        if (winner.id === 2) console.log('two');
        const outcome = document.querySelector('.outcome');
        switch (winner.id) {
            case 1:
                outcome.textContent = `${winner.playerName} wins!`
                outcome.classList.toggle('playerOne');
                break;
            case 2:
                outcome.textContent = `${winner.playerName} wins!`
                outcome.classList.toggle('playerTwo');
                break;
            default:
                outcome.textContent = `It's a tie!`;
                outcome.classList.toggle('accent');
                break;
        }
        const gameover = document.querySelector('.gameover');
        gameover.classList.add('active');
    }

    // add replay button

    // reset gameboard

    return {
        initializeBoard,
        updateBoard,
        deactivateBoard,
        announceWinner,
    }

})();

const gameLogic = (() => {
    let board = gameboard.board;
    let player1 = Player('one', 'X', 1);
    let player2 = Player('two', 'O', 2);

    let currentPlayer = player1;

    const startGame = () => {
        displayController.initializeBoard(board);
    }

    const swapPlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
            console.log(currentPlayer.playerName);
        } else {
            currentPlayer = player1;
            console.log(currentPlayer.playerName);
    }
}
    const isWinner = () => {
        checkRows();
        checkColumns();
        checkDiagonals();
        if (board.every(cell => cell)) endGame('tie');
    }

    const checkRows = () => {
        if (board[0] && board[1] && board[2]) {
            if (board[0] === board[1] && board[1] === board[2]) endGame(currentPlayer); 
        };
        if (board[3] && board[4] && board[5]) {
            if (board[3] === board[4] && board[4] === board[5]) endGame(currentPlayer);
        }
        if (board[6] && board[7] && board[8]) {
            if (board[6] === board[7] && board[7] === board[8]) endGame(currentPlayer);
        }
    }

    const checkColumns = () => {
        if (board[0] && board[3] && board[6]) {
            if (board[0] === board[3] && board[3] === board[6]) endGame(currentPlayer); 
        };
        if (board[1] && board[4] && board[7]) {
            if (board[1] === board[4] && board[4] === board[7]) endGame(currentPlayer);
        }
        if (board[2] && board[5] && board[8]) {
            if (board[2] === board[5] && board[5] === board[8]) endGame(currentPlayer);
        }
    }

    const checkDiagonals = () => {
        if (board[0] && board[4] && board[8]) {
            if (board[0] === board[4] && board[4] === board[8]) endGame(currentPlayer); 
        }
        if (board[2] && board[4] && board[6]) {
            if (board[2] === board[4] && board[4] === board[6]) endGame(currentPlayer);
        }
    }

    const endGame = (winner) => {
        displayController.deactivateBoard();
        displayController.announceWinner(winner);
    }

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
        currentPlayer,
    }
})();

gameLogic.startGame();

// start game button should:
// - properly input player name
// - properly input player marker (get both marker radio buttons; checked = player1, unchecked = player2);
// start game normally

// current bug: why the fuck do you always print out player one