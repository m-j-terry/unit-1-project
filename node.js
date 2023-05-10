/*----- constants -----*/
const colors = {
    '3' : 'rgb(180,130,110)', //ground
    '0' : 'rgb(100,149,237)', //water
    '1' : 'gray', //lily-pads/logs
    '-1' : 'green' //frogger
}

const colors2 = {
    '3' : 'rgb(180,130,110)', //ground
    '1' : 'gray', //road,
    '-1' : 'green', //frogger
    '0' : 'yellow' //use a random Math index to choose a car color
}   
/*----- state variables -----*/

let level = 1
let innerArr
let frogHop
let intervalSpeed
let frogger = {
    number : -1,
    row : 10,
    column : 6,
    previousColor : 3,
    life : -1
}
let gameboard
let board 
class Board {
    constructor(row0, row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, row11) {
    this.row0 = row0,
    this.row1 = row1,
    this.row2 = row2,
    this.row3 = row3,
    this.row4 = row4,
    this.row5 = row5,
    this.row6 = row6,
    this.row7 = row7,
    this.row8 = row8,
    this.row9 = row9,
    this.row10 = row10
    }
}

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
const nextLevelModal = document.querySelector('#nextLevelModal')
const playNxtBtn = document.querySelector('#nextLevelModal > #playButton')
const schoolZnBtn = document.querySelector('#nextLevelModal > #easyButton')
const highwayBtn = document.querySelector('#nextLevelModal > #mediumButton')
const interstateBtn = document.querySelector('#nextLevelModal > #hardButton')
const audobahnsBtn = document.querySelector('#nextLevelModal > #legendaryButton')

const boardHTML = document.querySelector('#gameboard')
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
    startModal.classList.toggle('open')
    if (intervalSpeed === null) {
        intervalSpeed = 1000
    }
    init() 
})

playAgainBtn.addEventListener('click', (e) => {
    winnerModal.classList.toggle('open')
    startModal.classList.toggle('open')
    intro.play()
})

tryAgainBtn.addEventListener('click', (e) => {
    gameOverModal.classList.toggle('open')
    init() 
})

nextLevelButton.addEventListener('click', (e) => {
    winnerModal.classList.toggle('open')
    froggerReset()
    level = 2
    console.log(level)
    nextLevelModal.classList.toggle('open')
})

playNxtBtn.addEventListener('click', (e) => {
    intro.pause()
    startModal.classList.toggle('open')
    if (intervalSpeed === null) {
        intervalSpeed = 1000
    }
    init() 
})

schoolZnBtn.addEventListener('click', (e) => {
    easyBtn.classList.add('speed')
    mediumBtn.classList.remove('speed')
    hardBtn.classList.remove('speed')
    legendaryBtn.classList.remove('speed')
    intervalSpeed = 1500
})

highwayBtn.addEventListener('click', (e) => {
    mediumBtn.classList.add('speed')
    easyBtn.classList.remove('speed')
    hardBtn.classList.remove('speed')
    legendaryBtn.classList.remove('speed')
    intervalSpeed = 900
})

interstateBtn.addEventListener('click', (e) => {
    hardBtn.classList.add('speed')
    easyBtn.classList.remove('speed')
    mediumBtn.classList.remove('speed')
    legendaryBtn.classList.remove('speed')
    intervalSpeed = 650
})
audobahnsBtn.addEventListener('click', (e) => {
    legendaryBtn.classList.add('speed')
    easyBtn.classList.remove('speed')
    mediumBtn.classList.remove('speed')
    hardBtn.classList.remove('speed')
    intervalSpeed = 300
})

/*----- functions -----*/ 

function init() {
    boardHTML.classList.toggle('open')
    froggerReset()
    if (level === 1) {
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
    } else if (level === 2) {
        board = [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //row 11, idx 0
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0], //row 10, idx 1
        [0, 1, 1, 1, 1, 0, 1, 1, 0, 1], //row 9, idx 2
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 0], //row 8, idx 3
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0], //row 7, idx 4
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1], //row 6, idx 5
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1], //row 5, idx 6
        [0, 1, 1, 1, 0, 1, 1, 0, 1, 1], //row 4, idx 7
        [1, 1, 1, 0, 1, 1, 0, 1, 0, 1], //row 3, idx 8
        [1, 1, 0, 1, 1, 0, 1, 1, 0, 1], //row 2, idx 9
        [3, 3, 3, 3, 3, -1, 3, 3, 3, 3] //row 1, idx 10, Frogger
        ]
    }
    setRows()
    frogHop = gameboard.row10
    render()    
}

function setRows() {
gameboard = new Board(board[0], board[1], board[2], board[3], board[4], board[5], board[6], board[7], board[8], board[9], board[10])
}


function render() {
    renderBoard()
    if (level === 1){
        riverInterval = setInterval(riverFlow, intervalSpeed) 
    } else if (level === 2) {  
        trafficInterval = setInterval(traffic, intervalSpeed)
    }
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


function froggerReset() {
    frogger.row = 10
    frogger.column = 6
    frogger.previousColor = 3
    frogger.life = -1
}


const checkScore = () => {
    if (frogger.life === 0 ) { 
        gameOver()
    } else if (gameboard.row0.includes(-1) === false && gameboard.row1.includes(-1) === false && gameboard.row2.includes(-1) === false && gameboard.row3.includes(-1) === false && gameboard.row4.includes(-1) === false && gameboard.row5.includes(-1) === false && gameboard.row6.includes(-1) === false && gameboard.row7.includes(-1) === false && gameboard.row8.includes(-1) === false && gameboard.row9.includes(-1) === false && gameboard.row10.includes(-1) === false) {
        gameOver()
    } else if (frogger.row === 0 || gameboard.row0.includes(-1)) {
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
        if (gameboard.row1[6] === 1 || gameboard.row1[6] === -1){
            gameboard.row1.push(1)
        } else {
            gameboard.row1.push(0)
        }
            gameboard.row1.shift()

        if (gameboard.row2[3] === 1 || gameboard.row2[3] === -1) {
            gameboard.row2.unshift(1)
        } else {
            gameboard.row2.unshift(0)
        }
            gameboard.row2.pop()

        if (gameboard.row3[7] === 1 || gameboard.row3[7] === -1){
            gameboard.row3.push(1)
        } else {
            gameboard.row3.push(0)
        }
            gameboard.row3.shift()

        if (gameboard.row6[3] === 1 || gameboard.row6[3] === -1) {
            gameboard.row6.unshift(1)
        } else {
            gameboard.row6.unshift(0)
        }
            gameboard.row6.pop()

        if (gameboard.row7[6] === 1 || gameboard.row7[6] === -1){
            gameboard.row7.push(1)
        } else {
            gameboard.row7.push(0)
        }
            gameboard.row7.shift()

        if (gameboard.row9[2] === 1 || gameboard.row9[2] === -1) {
            gameboard.row9.unshift(1)
        } else {
            gameboard.row9.unshift(0)
        }
            gameboard.row9.pop()
    froggerLogger()
    renderBoard()
    }

function traffic() {
    checkScore()
    entranceRamp(gameboard.row1)
    exitRamp(gameboard.row2)
    entranceRamp(gameboard.row3)
    exitRamp(gameboard.row4)
    entranceRamp(gameboard.row5)
    exitRamp(gameboard.row6)
    entranceRamp(gameboard.row7)
    exitRamp(gameboard.row8)
    entranceRamp(gameboard.row9)
    stationaryFrogger()
    renderBoard()
}
function stationaryFrogger() {
    frogColumn = frogger.column - 1
    if (gameboard.row1.includes(-1)) {
        gameboard.row1.splice(frogger.column, 1, -1)
        gameboard.row1.splice(frogColumn, 1, frogger.previousColor)
    } else if (gameboard.row2.includes(-1)) {
        gameboard.row2.splice(frogger.column, -1, -1)
    } else if (gameboard.row3.includes(-1)) {
        gameboard.row3.splice(frogger.column, 1, -1)
    } else if (gameboard.row4.includes(-1)) {
        gameboard.row4.splice(frogger.column, -1, -1)
    } else if (gameboard.row5.includes(-1)) {
        gameboard.row5.splice(frogger.column, 1, -1)
    } else if (gameboard.row6.includes(-1)) {
        gameboard.row6.splice(frogger.column, -1, -1)
    } else if (gameboard.row7.includes(-1)) {
        gameboard.row7.splice(frogger.column, 1, -1)
    } else if (gameboard.row8.includes(-1)) {
        gameboard.row8.splice(frogger.column, -1, -1)
    } else if (gameboard.row9.includes(-1)) {
        gameboard.row9.splice(frogger.column, 1, -1)
    }
}
const entranceRamp = (arr) => {
    let diceRoll = Math.floor(Math.random() * 6) + 1
    if (diceRoll === 3 || diceRoll === 4) {
        arr.push(0)
    } else {
        arr.push(1)
    } 
        arr.shift()
}

const exitRamp = (arr) => {
    let diceRoll = Math.floor(Math.random() * 6) + 1
    if (diceRoll === 3 || diceRoll === 4) {
        arr.unshift(0)
    } else {
        arr.unshift(1)
    } 
        arr.pop()
}

function froggerLogger() {
        if (frogger.row === 1 || frogger.row === 3 || frogger.row === 7) {
            frogger.column--
        } else if (frogger.row === 2 || frogger.row === 6 || frogger.row === 9) {
            frogger.column++
        }
    }


function winner() {
    if (level === 1) {
        clearInterval(riverInterval)
    } else if (level === 2 ) {
        clearInterval(trafficInterval)
    }
    boardHTML.classList.toggle('open')
    winnerModal.classList.toggle('open')
    theme.pause()
}

function gameOver() {
    if (level === 1) {
        clearInterval(riverInterval)
    } else if (level === 2 ) {
        clearInterval(trafficInterval)
    }
    theme.pause()
    plunk.play()
    // gameOverModal.classList.toggle('open')
}