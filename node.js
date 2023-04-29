/*----- constants -----*/
const colors = {
    '3' : 'brown', //ground
    '0' : 'blue', //water
    '1' : 'gray', //lily-pads/logs
    '-1' : 'green' //frogger
}

/*----- state variables -----*/

let board
let frogger = -1

/*----- cached elements  -----*/




/*----- event listeners -----*/
// addEventListener('keypress', => {
//  if ('keypress' = 'ArrowUp' || 'KeyW') {
//        ...
//    } else if ('keypress' = 'ArrowDown' || 'KeyS') {
//        ...
//    } else if ('keypress' = 'ArrowLeft' || 'KeyA') {
//        ...
//    } else ('keypress' = 'ArrowRight' || 'KeyD') {
//        ...
//    }
// })

// addEventListener('click', riverFlow)

/*----- functions -----*/
init() 

function init() {
    board = [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //row 11, idx 0, ground5
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0], //row 10, idx 1, river-6
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0], //row 9, idx 2, river-5
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 0], //row 8, idx 3, river-4
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //row 7, idx 4, ground4
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //row 6, idx 5, ground3
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0], //row 5, idx 6, river-3
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1], //row 4, idx 7, river-2
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //row 3, idx 8, ground2
        [1, 1, 0, 1, 1, 0, 1, 1, 0, 1], //row 2, idx 9, river-1
        [3, 3, 3, 3, 3, -1, 3, 3, 3, 3] //row 1, idx 10, ground1 & Frogger
    ]
    render()
}

function riverFlow() {
   

        // for (let i = 0; i < river6.length; i++){
        //     river6[i] = river6.indexOf(i + 1)
        // }

}

function render() {
    renderBoard()
}

function renderBoard() {
const ground1 = board[10]   //ground
const river1 = board[9]         //river
const ground2 = board[8]    //ground
const river2 = board[7]         //river
const river3 = board[6]         //river
const ground3 = board[5]    //ground
const ground4 = board[4]    //ground
const river4 = board[3]         //river
const river5 = board[2]         //river
const river6 = board[1]         //river
const ground5 = board[0]    //ground

for (let i = 0; i < ground1.length; i++) {
    const concat = `c${i}r${board.indexOf(ground1)}`
    const cellEl = document.getElementById("c" + i + "r" +board.indexOf(ground1))
    cellEl.style.backgroundColor = colors[ground1[i]]
}
/* create a for loop of for loops. The outer for loop will iterate through the board array and for each index in that array it will run the inner array, which colors the row. */

}


function frogHop() {
    if (frogger === -1) {
        render()
    } else {
        gameOver()
    }
}

function gameOver() {
    // clearInterval(riverInterval)
    // use a modal/carousel/.addClass to toggle pages and buttons to become visible.
}