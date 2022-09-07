

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
            return true;
        }
        else { //try to move in filled tile
            return null; //if not, return null
        }

        //if successfully plays, will call method that checks if player has won
    }

    const checkWin = (player) => {
        const mark = player ? 'x' : 'o';

        if(board[0] === mark) {
            if(board[1] === mark && board[2] === mark) {
                return true;
            }
            else if (board[4] === mark && board[8] === mark) {
                return true;
            }
            else if (board[3] === mark && board[6] === mark) {
                return true;
            }
            else { return false; }
        }
        else if (board[1] === mark) {
            if(board[4] === mark && board[7] === mark) {
                return true;
            }
            else { return false; }
        }
        else if (board[2] === mark) {
            if(board[4] === mark && board[6] === mark) {
                return true;
            }
            else if (board[5] === mark && board[8] === mark) {
                return true;
            }
            else { return false; }
        }
        else if (board[3] === mark) {
            if(board[4] === mark && board[5] === mark) {
                return true;
            }
            else { return false; }
        }
        else if (board[6] === mark) {
            if(board[7] === mark & board[8] === mark) {
                return true;
            }
            else { return false; }
        }
        else {
            return false;
        }
    }

    const restartBoard = () => {
        board = [];
        return board; //use this return w/ populate method to clear board
    }
    return { playerMove, checkWin, restartBoard }
})()

const displayController = (() => {
    let whoTurn = true; //player1 (x) is true, player2 (o) is false
    let player1 = player('x');
    let player2 = player('o');
    const tiles = document.querySelectorAll('.tile');    
    
    const start = () => {
        tiles.forEach(tile => tile.addEventListener('click', (tile) => move(tile)));
    }
    const move = (tile) => {
        let currTile = tile.path[0].id;
        // console.log(tile.path[0].id);
        if (gameBoard.playerMove(currTile, whoTurn)) {//if succesfully moved
            populate(currTile);
            if (gameBoard.checkWin(whoTurn)) {
                console.log(whoTurn + ' wins');
                //need to indicate win, then clear board
            }
            else {
                whoTurn = !whoTurn; //switch player turns
            }
        }
        else {
            // console.log('already full') so do nothing
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
    //addEventListener to each grid items, checking for click
        //if click, then call playerMove w/ input of tile_id and current player

    //need method to populate board based on return of board after successful playerMove is called 
        //loop through each tile and match id to index in each array

    //method to restart game   
        //will call restart board method and reset whoTurn to true (player1)
    return { start }
})()

displayController.start();