const gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    const updateBoard = (index, marker) => {
        board.splice(index, 1, marker);
    }

    const deactivateBoard = () => {
        for (i = 0; i < board.length; i++) {
            if (board[i] === '') board.splice(i, 1, ' ');
        }
    }

    const resetBoard = () => {
        for (i = 0; i < board.length; i++) {
            board.splice(i, 1, '');
        }
    }

    return {
        board,
        updateBoard,
        deactivateBoard,
        resetBoard,
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
        gameover.classList.toggle('active');
        const replayBtn = document.querySelector('.replay');
        replayBtn.addEventListener('click', replayGame);
    }

    // add replay button
    const replayGame = () => {
        const outcome = document.querySelector('.outcome');
        outcome.classList.remove('playerOne', 'playerTwo', 'accent');
        const gameover = document.querySelector('.gameover');
        gameover.classList.toggle('active');
        gameboard.resetBoard();
        displayController.updateBoard();
    }

    // reset gameboard

    return {
        initializeBoard,
        updateBoard,
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
        const marked = currentPlayer.marker;
        if (board[0] === marked && board[1] === marked && board[2] === marked
        || board[3] === marked && board[4] === marked && board[5] === marked
        || board[7] === marked && board[8] === marked && board[9] === marked
        || board[0] === marked && board[3] === marked && board[6] === marked
        || board[1] === marked && board[4] === marked && board[7] === marked
        || board[2] === marked && board[5] === marked && board[8] === marked
        || board[0] === marked && board[4] === marked && board[8] === marked
        || board[2] === marked && board[4] === marked && board[6] === marked) endGame(currentPlayer);
        else if (board.every(cell => cell)) endGame('tie');
    }

    const endGame = (winner) => {
        gameboard.deactivateBoard();
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