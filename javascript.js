

const player = (mark) => {

    return { mark }
}


const gameBoard = (() => {
    let board = [];

    const playerMove = (tile_id, player) => {

        if(board[tile_id] === undefined) { //will check if playermove is possible based on current board status
            if(player) { //player1 turn
                board[tile_id] = 'x'; //if so, will play player's mark there and return updated gameBoard
            }
            else { //player2 turn
                board[tile_id] = 'o'
            }
            console.log(board);
            return true;
        }
        else { //try to move in filled tile
            return null; //if not, return null
        }
        //if successfully plays, will call method that checks if player has won
    }

    const checkWin = (currTile, player) => {
        const mark = player ? 'x' : 'o';
        console.log(mark);
        console.log(board[2]);
        console.log(board[2] === mark);
        if(currTile == 0) {
            if ((board[1] === mark && board[2] === mark) ||
                (board[4] === mark && board[8] === mark) ||
                (board[3] === mark && board[6] === mark)) {
                    return true;
            }
        }
        else if (currTile == 1) {
            if ((board[4] === mark && board[7] === mark) ||
                (board[0] === mark && board[2] === mark)) {
                    return true;
            }
        }
        else if (currTile == 2) {
            console.log('hi');
            if ((board[4] === mark && board[6] === mark) ||
                (board[5] === mark && board[8] === mark) ||
                (board[0] === mark && board[1] === mark)) {
                   return true;
            }
        }
        else if (currTile == 3) {
            if ((board[4] === mark && board[5] === mark) ||
                (board[0] === mark && board[6] === mark)) {
                    return true;
            }
        }
        else if (currTile == 4) {
            if ((board[0] === mark & board[8] === mark) ||
                (board[3] === mark & board[5] === mark) ||
                (board[2] === mark & board[6] === mark) ||
                (board[1] === mark & board[7] === mark)) {
                    return true;
            }
        }
        else if (currTile == 5) {
            if ((board[3] === mark && board[4] === mark) ||
                (board[2] === mark && board[8] === mark)) {
                    return true;
            }
        }
        else if (currTile == 6) {
            if ((board[7] === mark && board[8] === mark) ||
                (board[2] === mark && board[4] === mark) ||
                (board[0] === mark && board[3] === mark)) {
                    return true;
            }
        }
        else if (currTile == 7) {
            if ((board[1] === mark && board[4] === mark) ||
                (board[6] === mark && board[8] === mark)) {
                    return true;
            }
        }
        else if (currTile == 8) {
            if ((board[7] === mark && board[6] === mark) ||
                (board[2] === mark && board[5] === mark) ||
                (board[0] === mark && board[4] === mark)) {
                    return true;
            }
        }
        else {
            return false;
        }
    }

    const checkTie = () => {
        if (board.length == 9) {
            for (let i = 0; i < board.length; i++) {
                if (board[i] == undefined) {
                    return false;
                }
            }
            return true;
        }
    }

    const fillBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = 'x'; //simply fill board so no moves can be made
        }
    }

    const restartBoard = () => {
        board = [];
        return board; //use this return w/ populate method to clear board
    }
    return { playerMove, checkWin, restartBoard, checkTie, fillBoard }
})()

const displayController = (() => {
    let whoTurn = true; //player1 (x) is true, player2 (o) is false
    let player1 = player('x');
    let player2 = player('o');
    const tiles = document.querySelectorAll('.tile');    
    const restart = document.querySelector('#restart');
    var winMarkers = document.querySelectorAll('.winMarker');
    restart.addEventListener('click', () => restartGame());
    
    const start = () => {
        tiles.forEach(tile => tile.addEventListener('click', (tile) => move(tile)));
    }
    const move = (tile) => {
        let currTile = tile.path[0].id;
        // console.log(tile.path[0].id);
        if (gameBoard.playerMove(currTile, whoTurn)) {//if succesfully moved
            populate(currTile); //show move on board
            // console.log(gameBoard.checkWin(whoTurn));
            if (gameBoard.checkWin(currTile, whoTurn)) { //check if winning move
                // console.log(whoTurn + ' wins');
                gameBoard.fillBoard();
                showWin();
                //need to indicate win, then clear board
            }
            else if (gameBoard.checkTie()) { //nobody won but the board is full, i.e tie
                console.log('Tie');
                showTie();
            }
            else {
                whoTurn = !whoTurn; //switch player turns and continue playing
            }
        }
        else {
            // ineligible move, so do nothing
        }
    }

    const populate = (tile_id) => {
        if (whoTurn) {
            tiles[tile_id].innerHTML = 'x';
        }
        else {
            tiles[tile_id].innerHTML = 'o';
        }
    }

    const showWin = () => {
        const winMark = whoTurn ? 'x' : 'o';
        const winner = document.querySelector(`#${winMark}`);
        winner.innerHTML = 'Wins!';
    }

    const showTie = () => {
        const tie = document.querySelectorAll('.winMarker');
        tie.forEach(marker => marker.innerHTML = 'Tie!');
    }

    const restartGame = () => {
        tiles.forEach(tile => tile.innerHTML = '');
        gameBoard.restartBoard();
        winMarkers.forEach(mark => mark.innerHTML = '');
    }
    //addEventListener to each grid items, checking for click
        //if click, then call playerMove w/ input of tile_id and current player

    //need method to populate board based on return of board after successful playerMove is called 
        //loop through each tile and match id to index in each array

    //method to restart game   
        //will call restart board method and reset whoTurn to true (player1)
    return { start }
})()

displayController.start();