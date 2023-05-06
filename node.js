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
let ground5
let river6
let river5
let river4
let ground4
let ground3
let river3
let river2
let ground2
let river1
let ground1 
let frogHop 
let intervalSpeed

/*----- cached elements  -----*/
const playBtn = document.querySelector('#playButton')
const startModal = document.querySelector('#startGameModal')
const easyBtn = document.querySelector('#easyButton')
const mediumBtn = document.querySelector('#mediumButton')
const hardBtn = document.querySelector('#hardButton')
const legendaryBtn = document.querySelector('#legendaryButton')
const tryAgainBtn = document.querySelector('#tryAgainButton')
const gameOverModal = document.querySelector('#gameOverModal')
const nextLevelBtn = document.querySelector('#nextLevelButton')
const winnerModal = document.querySelector('#winnerModal')
const playAgainBtn = document.querySelector('#playAgainButton')
//audio files
const intro = document.querySelector('#intro')
const hop = document.querySelector('#hop')
const plunk = document.querySelector('#plunk')
const theme = document.querySelector('#theme')

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

easyBtn.addEventListener('click', (e) => {
    easyBtn.classList.add('speed')
    mediumBtn.classList.remove('speed')
    hardBtn.classList.remove('speed')
    legendaryBtn.classList.remove('speed')
    intervalSpeed = 1500
})

mediumBtn.addEventListener('click', (e) => {
    mediumBtn.classList.add('speed')
    easyBtn.classList.remove('speed')
    hardBtn.classList.remove('speed')
    legendaryBtn.classList.remove('speed')
    intervalSpeed = 900
})

hardBtn.addEventListener('click', (e) => {
    hardBtn.classList.add('speed')
    easyBtn.classList.remove('speed')
    mediumBtn.classList.remove('speed')
    legendaryBtn.classList.remove('speed')
    intervalSpeed = 650
})

legendaryBtn.addEventListener('click', (e) => {
    legendaryBtn.classList.add('speed')
    easyBtn.classList.remove('speed')
    mediumBtn.classList.remove('speed')
    hardBtn.classList.remove('speed')
    intervalSpeed = 300
})

playBtn.addEventListener('click', (e) => {
    intro.pause()
    if (!easyBtn || !mediumBtn ||!hardBtn || !legendaryBtn){
        intervalSpeed = 1000
    }
    startModal.classList.toggle('open')
    init() 
})

playAgainBtn.addEventListener('click', (e) => {
    winnerModal.classList.toggle('open')
    startModal.classList.toggle('open')
    frogger.row = 10
    frogger.column = 6
    frogger.previousColor = 3
    intro.play()
})

tryAgainBtn.addEventListener('click', (e) => {
    gameOverModal.classList.toggle('open')
    frogger.row = 10
    frogger.column = 6
    frogger.previousColor = 3
    frogger.life = -1
    init() 
})
/*----- functions -----*/ 

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
    ground5 = board[0]
    river6 = board[1]
    river5 = board[2]
    river4 = board[3]
    ground4 = board[4]
    ground3 = board[5]
    river3 = board[6]
    river2 = board[7]
    ground2 = board[8]
    river1 = board[9]
    ground1 = board[10]
    frogHop = board[frogger.row]
    render()    
}

function render() {
    renderBoard()
    riverInterval = setInterval(riverFlow, intervalSpeed)     /* could potentially set up a difficulty option in the modal using template literals to determine the setInterval time. */
    theme.play()

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
        winner()
    }
}

/* Hopping functions */

function hopForward() {
    //change frogger square color to preset value.
    frogHop.splice(frogger.column -1, 1, frogger.previousColor)
    frogger.row = frogger.row -1
    //record the color of the square that frogger will jump to and see if Frogger fell in the water or not. If frogger is 
    frogHop = board[frogger.row]
    frogger.previousColor = frogHop[frogger.column -1]
    frogger.life = frogger.life * frogHop[frogger.column -1]
    //change the color of the space frogger jumps to//set log interval to keep track of the indexof the log frogger jumped on.
    frogHop.splice(frogger.column -1, 1, frogger.number)
    hop.play()
    renderBoard()
}

function hopLeft() {
    //change frogger square color to preset value
    frogHop.splice(frogger.column -1, 1, frogger.previousColor)
    frogger.column = frogger.column - 1
    //record the color of the square that frogger will jump to and see ifFrogger fell in the water or not!
    frogHop = board[frogger.row]
    frogger.previousColor = frogHop[frogger.column -1]
    frogger.life = frogger.life * frogHop[frogger.column -1]
    //change the color of the space frogger jumps to
    frogHop.splice(frogger.column -1, 1, frogger.number)
    hop.play()
    renderBoard()
}

function hopRight() {
    //change frogger square color to preset value
    frogHop.splice(frogger.column -1, 1, frogger.previousColor)
    frogger.column = frogger.column + 1
    //record the color of the square that frogger will jump to and see if Frogger fell in the water or not!
    frogHop = board[frogger.row]
    frogger.previousColor = frogHop[frogger.column -1]
    frogger.life = frogger.life * frogHop[frogger.column -1]
    //change the color of the space frogger jumps to.
    frogHop.splice(frogger.column -1, 1, frogger.number)
    hop.play()
    renderBoard()
}

function hopBackward() {
    //change frogger square color to preset value
    frogHop.splice(frogger.column -1, 1, frogger.previousColor)
    frogger.row = frogger.row + 1
    //record the color of the square that frogger will jump to and see if Frogger fell in the water or not!
    frogHop = board[frogger.row]
    frogger.previousColor = frogHop[frogger.column -1]
    frogger.life = frogger.life * frogHop[frogger.column -1]
    //change the color of the space frogger jumps to.
    frogHop.splice(frogger.column -1, 1, frogger.number)
    hop.play()
    renderBoard()
}
/* interval and closure for river and Frogger's movements */
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
    froggerLogger()
    renderBoard()
    }

function froggerLogger() {
        if (frogger.row === 1 || frogger.row === 3 || frogger.row === 7) {
            frogger.column--
        } else if (frogger.row === 2 || frogger.row === 6 || frogger.row === 9) {
            frogger.column++
        }
    }


function winner() {
    clearInterval(riverInterval)
    winnerModal.classList.toggle('open')
    theme.pause()
}

function gameOver() {
    clearInterval(riverInterval)
    theme.pause()
    plunk.play()
    gameOverModal.classList.toggle('open')
}