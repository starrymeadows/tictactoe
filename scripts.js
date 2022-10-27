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
    const playerOne = document.getElementById('playerOne-name');
    const playerTwo = document.getElementById('playerTwo-name');
    const panels = document.querySelectorAll('.panel');
    const outcome = document.querySelector('.outcome');
    const gameover = document.querySelector('.gameover');
    const playBtn = document.querySelector('.start');
    const replayBtn = document.querySelector('.replay');

    const markerChoices = document.querySelectorAll('input[name=playerOne-marker]');


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

    const togglePanels = () => {
        panels.forEach(panel => {
            panel.classList.toggle('active');
        })
    }

    const announceWinner = (winner) => {
        if (winner.id === 1) console.log('one');
        if (winner.id === 2) console.log('two');
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
        gameover.classList.toggle('active');
        replayBtn.addEventListener('click', _replayGame);
    }

    const _replayGame = () => {
        gameover.classList.toggle('active');
        outcome.classList.remove('playerOne', 'playerTwo', 'accent');
        gameboard.resetBoard();
        displayController.updateBoard();
        gameboard.deactivateBoard();
        displayController.togglePanels();
    }

    // reset gameboard

    return {
        initializeBoard,
        updateBoard,
        announceWinner,
        playerOne,
        playerTwo,
        playBtn,
        markerChoices,
        togglePanels,
    }

})();

const gameLogic = (() => {
    let board = gameboard.board;
    let player1, player2, currentPlayer;

    const startGame = () => {
        gameboard.resetBoard();
        displayController.initializeBoard(board);
        // set player names
        const playerOneName = displayController.playerOne.value;
        const playerTwoName = displayController.playerTwo.value;
        // set player markers
        const chooseX = displayController.markerChoices[0];
        const chooseY = displayController.markerChoices[1];
        if (chooseX.checked) {
            player1 = Player(playerOneName, chooseX.value, 1);
            player2 = Player(playerTwoName, chooseY.value, 2)
            currentPlayer = player1;
        } else {
            player1 = Player(playerOneName, chooseY.value, 1);
            player2 = Player(playerTwoName, chooseX.value, 2);
            currentPlayer = player1;
        }
        displayController.togglePanels();
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

displayController.playBtn.addEventListener('click', gameLogic.startGame);