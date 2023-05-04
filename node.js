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
    clearInterval(logInterval)
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

/*----- functions -----*/
init() 

let ground5 = board[0]
let river6 = board[1]
let river5 = board[2]
let river4 = board[3]
let ground4 = board[4]
let ground3 = board[5]
let river3 = board[6]
let river2 = board[7]
let ground2 = board[8]
let river1 = board[9]
let ground1 = board[10]

function init() {
    board = [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //row 11, idx 0, ground5
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0], //row 10, idx 1, river-6
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0], //row 9, idx 2, river-5
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 0], //row 8, idx 3, river-4
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //row 7, idx 4, ground4
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //row 6, idx 5, ground3
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 1], //row 5, idx 6, river-3
        [0, 1, 0, 0, 0, 1, 0, 0, 0, 1], //row 4, idx 7, river-2
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
}

const checkScore = () => {
    if (frogger.life === 0 ) {
        gameOver()
    } else if (ground5.includes(-1) === false && river6.includes(-1) === false && river5.includes(-1) === false && river4.includes(-1) === false && ground4.includes(-1) === false && ground3.includes(-1) === false && river3.includes(-1) === false && river2.includes(-1) === false && ground2.includes(-1) === false && river1.includes(-1) === false && ground1.includes(-1) === false) {
        gameOver()
    } else if (frogger.row === 0) {
        alert("Congrats! Frogger made it across the rivers safely!")
    }
}

/* Hopping functions */
let frogHop = board[frogger.row]

function hopForward() {
    console.log('hop up')
    //change frogger square color to preset value.
    frogHop.splice(frogger.column -1, 1, frogger.previousColor)
    frogger.row = frogger.row -1
    //record the color of the square that frogger will jump to and see if Frogger fell in the water or not. If frogger is 
    frogHop = board[frogger.row]
    frogger.previousColor = frogHop[frogger.column -1]
    frogger.life = frogger.life * frogHop[frogger.column -1]
    //change the color of the space frogger jumps to//set log interval to keep track of the indexof the log frogger jumped on.
        frogHop.splice(frogger.column -1, 1, frogger.number)
    if (frogger.row === 1 || frogger.row === 2 || frogger.row === 3 || frogger.row === 6 || frogger.row === 7 || frogger.row === 9) {
        logIndex()
    } 
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
        //change the color of the space frogger jumps to
        frogHop.splice(frogger.column -1, 1, frogger.number)
    if (frogger.row === 1 || frogger.row === 2 || frogger.row === 3 || frogger.row === 6 || frogger.row === 7 || frogger.row === 9) {
        logIndex()
    } 
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
    if (frogger.row === 1 || frogger.row === 2 || frogger.row === 3 || frogger.row === 6 || frogger.row === 7 || frogger.row === 9) {
        logIndex()
    } 
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
    if (frogger.row === 1 || frogger.row === 2 || frogger.row === 3 || frogger.row === 6 || frogger.row === 7 || frogger.row === 9) {
        logIndex()
    } 
    renderBoard()
}

function riverFlow() {
    checkScore()
        if (river6[6] === 1 || river6[6] === -1){
            river6.push(1)
        } else {
            river6.push(0)
        }
        river6.shift()

        if (river5[3] === 1 || river5[3] === -1) {
            river5.unshift(1)
        } else {
            river5.unshift(0)
        }
            river5.pop()

        if (river4[7] === 1 || river4[7] === -1){
            river4.push(1)
        } else {
            river4.push(0)
        }
        river4.shift()

        if (river3[3] === 1 || river3[3] === -1) {
            river3.unshift(1)
        } else {
            river3.unshift(0)
        }
        river3.pop()

        if (river2[6] === 1 || river2[6] === -1){
            river2.push(1)
        } else {
            river2.push(0)
        }
            river2.shift()

        if (river1[2] === 1 || river1[2] === -1) {
            river1.unshift(1)
        } else {
            river1.unshift(0)
        }
            river1.pop()
    render()
    }


const riverInterval = setInterval(riverFlow, 1500)
let logInterval
function logIndex() {
    logInterval = setInterval(logVelocity, 1300)
    console.log(this)
}

function logVelocity() {
    console.log(frogger)
    if (frogger.row === 1 || frogger.row === 3 || frogger.row === 7) {
        frogger.column--
    } else if (frogger.row === 2 || frogger.row === 6 || frogger.row === 9) {
        frogger.column++
    }
    console.log(frogger.column)
}

function gameOver() {
    clearInterval(riverInterval, logInterval)
    alert('Oh no, Frogger got swept away by the river!')
    // use a modal/carousel/.addClass to toggle pages and buttons to become visible.
}