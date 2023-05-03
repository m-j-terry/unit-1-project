/*----- constants -----*/
const colors = {
    '3' : 'rgb(180,130,110)', //ground
    '0' : 'rgb(100,149,237)', //water
    '1' : 'gray', //lily-pads/logs
    '-1' : 'green' //frogger
}

/*----- state variables -----*/

let board
let innerArr = null
let frogger = {
    number : -1,
    row : 10,
    column : 6,
    previousColor : 3,
    life : -1
}

/*----- cached elements  -----*/




/*----- event listeners -----*/
addEventListener('keydown', (event) => {
    if (event.code == 'ArrowUp' || event.code == 'KeyW') {
        hopForward()
    } else if (event.code == 'ArrowDown' || event.code == 'KeyS') {
        hopBackward()
    } else if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
        hopLeft()
    } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
        hopRight()
    }
})

// addEventListener('click', (e) => {
//     riverFlow()
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

function render() {
    renderBoard()
}

function renderBoard() {
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
    if (frogger.life === 0) {
        gameOver()
    }
}


/* Hopping functions */
let frogHop = board[frogger.row]

function hopForward() {
    console.log('hop up')
    //change frogger square color to preset value 
    frogHop.splice(frogger.column -1, 1, frogger.previousColor)
    frogger.row = frogger.row -1
    //record the color of the square that frogger will jump to and see if Frogger fell in the water or not!
    frogHop = board[frogger.row]
    frogger.previousColor = frogHop[frogger.column -1]
    frogger.life = frogger.life * frogHop[frogger.column -1]
    //change the color of the space frogger jumps to.
    frogHop.splice(frogger.column -1, 1, frogger.number)
    renderBoard()
}

function hopLeft() {
    console.log('hop left')
    //change frogger square color to preset value
    frogHop.splice(frogger.column -1, 1, frogger.previousColor)
    frogger.column = frogger.column - 1
    //record the color of the square that frogger will jump to and see if Frogger fell in the water or not!
    frogHop = board[frogger.row]
    frogger.previousColor = frogHop[frogger.column -1]
    frogger.life = frogger.life * frogHop[frogger.column -1]
    //change the color of the space frogger jumps to.
    frogHop.splice(frogger.column -1, 1, frogger.number)
    renderBoard()
}


function hopRight() {
    console.log('hop right')
    //change frogger square color to preset value
    frogHop.splice(frogger.column -1, 1, frogger.previousColor)
    frogger.column = frogger.column + 1
    //record the color of the square that frogger will jump to and see if Frogger fell in the water or not!
    frogHop = board[frogger.row]
    frogger.previousColor = frogHop[frogger.column -1]
    frogger.life = frogger.life * frogHop[frogger.column -1]
    //change the color of the space frogger jumps to.
    frogHop.splice(frogger.column -1, 1, frogger.number)
    renderBoard()
}

function hopBackward() {
    console.log('hop back')
    //change frogger square color to preset value
    frogHop.splice(frogger.column -1, 1, frogger.previousColor)
    frogger.row = frogger.row + 1
    //record the color of the square that frogger will jump to and see if Frogger fell in the water or not!
    frogHop = board[frogger.row]
    frogger.previousColor = frogHop[frogger.column -1]
    frogger.life = frogger.life * frogHop[frogger.column -1]
    //change the color of the space frogger jumps to.
    frogHop.splice(frogger.column -1, 1, frogger.number)
    renderBoard()
}



function riverFlow() {
    let river6 = board[1]
        river6.push(river6[0])
        river6.shift()
    let river5 = board[2]
        river5.unshift(river5[9])
        river5.pop()
    let river4 = board[3]
        river4.push(river4[0])
        river4.shift()
    let river3 = board[6]
        river3.unshift(river3[9])
        river3.pop()
    let river2 = board[7] //needs a new pattern to sync up with river 3
        river2.push(river2[0])
        river2.shift()
    let river1 = board[9]
        river1.unshift(river1[9])
        river1.pop()
    render()
    }

// }

// const riverInterval = setInterval(riverFlow, 1500)
//Perhaps instead of pushing and popping/ shifting and unshifting,and manipulating the preexisting elements of the array, which causes interference in the patterns, you could nest several different intervals within a closure that send the different patterns at different times. 


function gameOver() {
    clearInterval(riverInterval)
    alert('Oh no, Frogger got swept away by the river!')
    // use a modal/carousel/.addClass to toggle pages and buttons to become visible.
}