/*----- constants -----*/
const colors = {
    '3' : 'rgb(180,130,110)', //ground
    '0' : 'rgb(100,149,237)', //water
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
let innerArr = null
for (let i = 0; i < board.length; i++) {
    innerArr = board[i]
    generateRow()
    function generateRow() {
        for (let i = 0; i < innerArr.length; i++) {
        const cellEl = document.getElementById("c" + i + "r" +board.indexOf(innerArr))
        cellEl.style.backgroundColor = colors[innerArr[i]]
    }
}
}
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