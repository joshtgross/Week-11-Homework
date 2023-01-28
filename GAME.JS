

/* references to HTML elements to select with query selector and query selector all*/

window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');


    /* Creates array with 9 empty strings, creates player 'x' or 'o' and if the game is active or not */
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer ='O';
    let isGameActive = true;

    /* Three string values that represent end game state*/
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE  = 'TIE';

    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]

    */
/*Array of Arrays with different indexes for winnable conditions */
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], 
        [2, 4, 6]
    ];

/* Function that handles results, which loop conditions array, if the array results have the same index elements, if statements to see if end results continue round or announce winner or tie */
    function handleResultValidation() {
        let roundWon = false;
        for (let i =0;i <=7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b ==='' || c === ''){
                continue;
            }
            if (a ===b && b === c) {
                roundWon = true;
                break;
            } 
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes(''))
            announce(TIE);
    }

/* Switch statement to announce winner or tie*/
        const announce = (type) => {
            switch(type){
                case PLAYERO_WON:
                    announcer.innerHTML = 'Player <span class="playerO">O</span> won!'
                    break;
                case PLAYERX_WON:
                    announcer.innerHTML = 'Player <span class="playerX">X</span> won!'
                    break;
                case TIE:
                    announcer.innerText = 'Tie!';
            }
            announcer.classList.remove('hide');
        }
/* Function to tell if the player is playing empty tile or not on their turn */
        const isValidAction = (tile) => {
            if (tile.innerText === 'X' || tile.innerText === 'O'){
                return false;
            }
            return true;
        }

/*sets the value of the element in the board array at a given position to be equal to the value of the current player variable  */
        const updateBoard = (index) => {
            board[index] = currentPlayer;
        }

/* Function to change the playe r& change player display*/
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    /* Function that allows player action, if the action is valid, if game is active or not, winnable condition*/
    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    /* Resets game, sets the board to nine empty strings, sets game active variable to true, if statement to change player, lastly UI is updated to to set the inner text to an empty string and remove player classes    */
    const resetBoard = () => {
        board =['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer ==='O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = ''; 
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

/* Function to see user action to call for a specfic tile and the index of it */
    tiles.forEach ((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });


    resetButton.addEventListener('click', resetBoard)
});