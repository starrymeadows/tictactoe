const gameboard = (() => {
    // gameboard array
    const board = ['x', 'o', 'x', 'o', 'x', 'x', 'x', 'o', 'o'];

    // update array

    return {
        board,
    }
})();

// needs access to: board, players, winstate
const displayController = ((currentBoard) => {
    // draw the gameboard
    const initializeBoard = (currentBoard) => {
        const cells = document.querySelectorAll('.cell');
        for (i = 0; i < cells.length; i++) {
            // get the index of the cell
            let cell = cells.item(i);
            // append content to the cell according to corresponding index of board
            cell.textContent = currentBoard[i];
        };
    };

    return {
        initializeBoard,
    }
    // draw players

    // update gameboard

    // display win message

})(board);


// needs access to: board, players
// const gameLogic = (() => {
//     // determine current player

//     // place marker (call to update array, update display)

//     // determine win / tie

//     // swap current player

//     // add replay button
// })();

// const Players = (playerName, marker, id) = {
//     // return new player
// }

displayController.initializeBoard(gameboard.board);