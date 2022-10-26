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

// needs access to: board, players, winstate
const displayController = ((currentBoard) => {
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

})(board);


// needs access to: board, players
const gameLogic = (() => {
    const marker = 'z';
    // determine current player

    // place marker (call to update array, update display)
    const placeMarker = (index) => {
        if (gameboard.board[index] === '') {
            gameboard.updateBoard(index, marker);
            displayController.updateBoard();
        }
    }

    // determine win / tie

    // swap current player

    return {
        placeMarker,
    }
})();

// const Players = (playerName, marker, id) = {
//     // return new player
// }

displayController.initializeBoard(gameboard.board);