/*----- constants -----*/
const colors = {
    '3' : 'rgb(180,130,110)', //ground
    '0' : 'rgb(100,149,237)', //water
    '1' : 'gray', //lily-pads/logs
    '-1' : 'green', //frogger
    '4' : 'yellow', 
    '5' : 'red', 
    '6' : 'orange', 
    '7' : 'purple', 
    '8' : 'navy', 
    '9' : 'brown', 
    '10' : 'white'
}

/*----- state variables -----*/

let level = 1
let innerArr
let frogHop
let intervalSpeed = 1000
let frogger = {
    number : -1,
    row : 10,
    column : 6,
    previousColor : 3,
    previousColorLeft : null,
    previousColorRight : null,
    life : -1
}

let gameboard
let board 
let riverInterval
let trafficInterval
let carSplatCol
let carSplatRow
class Board {
    constructor(row0, row1, row2, row3, row4, row5, row6, row7, row8, row9, row10) {
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
const modal = document.querySelector('.modal')
const startModal = document.querySelector('#startGameModal')
const easyBtn = document.querySelector('#easyButton')
const mediumBtn = document.querySelector('#mediumButton')
const hardBtn = document.querySelector('#hardButton')
const legendaryBtn = document.querySelector('#legendaryButton')
const playBtn = document.querySelector('#playButton')
const tryAgainBtn = document.querySelector('#tryAgainButton')
const gameOverModal = document.querySelector('#gameOverModal')
const nextLevelBtn = document.querySelector('#nextLevelButton')
const winnerModal = document.querySelector('#winnerModal')
const playAgainBtn = document.querySelector('#playAgainButton')
const nextLevelModal = document.querySelector('#nextLevelModal')
const playNxtBtn = document.querySelector('#playNextLevelButton')
const schoolZnBtn = document.querySelector('#schoolZone')
const highwayBtn = document.querySelector('#highway')
const interstateBtn = document.querySelector('#interstate')
const autobahnBtn = document.querySelector('#autobahn')
const replayModal = document.querySelector('#replayModal')
const level1Btn = document.querySelector('#level1')
const level2Btn = document.querySelector('#level2')

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
    console.log(intervalSpeed)
    intervalSpeed = 1500
    console.log(intervalSpeed)
})

mediumBtn.addEventListener('click', (e) => {
    mediumBtn.classList.add('speed')
    easyBtn.classList.remove('speed')
    hardBtn.classList.remove('speed')
    legendaryBtn.classList.remove('speed')
    console.log(intervalSpeed)
    intervalSpeed = 900
    console.log(intervalSpeed)
})

hardBtn.addEventListener('click', (e) => {
    hardBtn.classList.add('speed')
    easyBtn.classList.remove('speed')
    mediumBtn.classList.remove('speed')
    legendaryBtn.classList.remove('speed')
    console.log(intervalSpeed)
    intervalSpeed = 650
    console.log(intervalSpeed)
})

legendaryBtn.addEventListener('click', (e) => {
    legendaryBtn.classList.add('speed')
    easyBtn.classList.remove('speed')
    mediumBtn.classList.remove('speed')
    hardBtn.classList.remove('speed')
    console.log(intervalSpeed)
    intervalSpeed = 300
    console.log(intervalSpeed)
})

playBtn.addEventListener('click', (e) => {
    intro.pause()
    startModal.classList.add('close')
    modal.classList.add('close')
    init() 
})

playAgainBtn.addEventListener('click', (e) => {
    winnerModal.classList.remove('open')
    startModal.classList.remove('close')
    intro.play()
})

tryAgainBtn.addEventListener('click', (e) => {
    gameOverModal.classList.remove('open')
    modal.classList.add('close')
    init() 
})

nextLevelBtn.addEventListener('click', (e) => {
    winnerModal.classList.remove('open')
    nextLevelModal.classList.add('open')
    level = 2   
})

playNxtBtn.addEventListener('click', (e) => {
    intro.pause()
    nextLevelModal.classList.remove('open')
    modal.classList.add('close')
    init() 
})

schoolZnBtn.addEventListener('click', (e) => {
    schoolZnBtn.classList.add('speed')
    highwayBtn.classList.remove('speed')
    interstateBtn.classList.remove('speed')
    autobahnBtn.classList.remove('speed')
    intervalSpeed = 1500
})

highwayBtn.addEventListener('click', (e) => {
    highwayBtn.classList.add('speed')
    schoolZnBtn.classList.remove('speed')
    interstateBtn.classList.remove('speed')
    autobahnBtn.classList.remove('speed')
    intervalSpeed = 900
})

interstateBtn.addEventListener('click', (e) => {
    interstateBtn.classList.add('speed')
    schoolZnBtn.classList.remove('speed')
    highwayBtn.classList.remove('speed')
    autobahnBtn.classList.remove('speed')
    intervalSpeed = 650
})

autobahnBtn.addEventListener('click', (e) => {
    autobahnBtn.classList.add('speed')
    schoolZnBtn.classList.remove('speed')
    highwayBtn.classList.remove('speed')
    interstateBtn.classList.remove('speed')
    intervalSpeed = 300
})

level1Btn.addEventListener('click', (e) => {
    replayModal.classList.remove('open')
    level = 1
    startModal.classList.remove('close')
})

level2Btn.addEventListener('click', (e) => {
    replayModal.classList.remove('open')
    level = 2
    nextLevelModal.classList.add('open')
})
/*----- functions -----*/ 

//board functions
function init() {
    boardHTML.classList.add('open')
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
        [1, 4, 1, 5, 1, 6, 1, 7, 1, 8], //row 10, idx 1
        [9, 1, 1, 1, 1, 10, 1, 1, 4, 1], //row 9, idx 2
        [5, 1, 6, 7, 1, 8, 9, 1, 10, 4], //row 8, idx 3
        [5, 1, 1, 1, 1, 6, 1, 1, 1, 7], //row 7, idx 4
        [1, 1, 1, 8, 1, 1, 1, 1, 9, 1], //row 6, idx 5
        [1, 1, 10, 1, 1, 1, 1, 4, 1, 1], //row 5, idx 6
        [5, 1, 1, 1, 6, 1, 1, 7, 1, 1], //row 4, idx 7
        [1, 1, 1, 8, 1, 1, 9, 1, 10, 1], //row 3, idx 8
        [1, 1, 4, 1, 1, 5, 1, 1, 6, 1], //row 2, idx 9
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
    if (intervalSpeed === null) {
        intervalSpeed = 1000
    }

    console.log(intervalSpeed)
    if (level === 1) {
        riverInterval = setInterval(riverFlow, intervalSpeed) 
    } else if (level === 2) {  
        trafficInterval = setInterval(traffic, intervalSpeed)
    }
    console.log(intervalSpeed)
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
    frogger.previousColorLeft = null
    frogger.previousColorRight = null
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
    if (frogHop[frogger.column - 1] === 4 || frogHop[frogger.column - 1] === 5 || frogHop[frogger.column - 1] === 6 || frogHop[frogger.column - 1] === 7 || frogHop[frogger.column - 1] === 8 || frogHop[frogger.column - 1] === 9 || frogHop[frogger.column - 1] === 10) {
        // frogger.life = frogger.life * 0
        gameOver()
    }
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
    if (frogHop[frogger.column - 1] === 4 || frogHop[frogger.column - 1] === 5 || frogHop[frogger.column - 1] === 6 || frogHop[frogger.column - 1] === 7 || frogHop[frogger.column - 1] === 8 || frogHop[frogger.column - 1] === 9 || frogHop[frogger.column - 1] === 10) {
        gameOver()
    }
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
    if (frogHop[frogger.column -1] === 4 || frogHop[frogger.column -1] === 5 || frogHop[frogger.column -1] === 6 || frogHop[frogger.column -1] === 7 || frogHop[frogger.column -1] === 8 || frogHop[frogger.column -1] === 9 || frogHop[frogger.column -1] === 10) {
        gameOver()    
    }
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
    if (frogHop[frogger.column - 1] === 4 || frogHop[frogger.column - 1] === 5 || frogHop[frogger.column - 1] === 6 || frogHop[frogger.column - 1] === 7 || frogHop[frogger.column - 1] === 8 || frogHop[frogger.column - 1] === 9 || frogHop[frogger.column - 1] === 10) {
        gameOver()
    }
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
        if (gameboard.row1[6] === 1 || gameboard.row1[6] === -1) {
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

        if (gameboard.row7[6] === 1 || gameboard.row7[6] === -1) {
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
    let right = frogger.column
    let left = frogger.column - 2
    carSplat()
    checkScore()
    if (frogger.row === 1 || frogger.row === 3 || frogger.row === 5 || frogger.row === 7 || frogger.row === 9) {
        carSplatCol = frogHop[right]
        carSplatRow = frogger.row 
    } else if (frogger.row === 2 || frogger.row === 4 || frogger.row === 6 || frogger.row === 8) {
        carSplatCol = frogHop[left]
        carSplatRow = frogger.row
    }
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

function carSplat() {
    if (frogger.row === carSplatRow && carSplatCol === 4 || carSplatCol === 5 || carSplatCol === 6 || carSplatCol === 7 || carSplatCol === 8 || carSplatCol === 9 || carSplatCol === 10) {
        gameOver()    
    }
}

function stationaryFrogger() {
    let right = frogger.column
    let left = frogger.column - 2       //make these three rows (and 386-388) dryer
    let center = frogger.column - 1 
    if (frogger.row === 9) {
        frogger.previousColorRight = gameboard.row9[right]
        gameboard.row9.splice(right, 1, frogger.previousColorRight) //right
        gameboard.row9.splice(center, 1, -1) //middle
        gameboard.row9.splice(left, 1, 1) //left        
    } else if (gameboard.row8.includes(-1)) {
        frogger.previousColorLeft = gameboard.row8[left]
        gameboard.row8.splice(left, 1, frogger.previousColorLeft) //right
        gameboard.row8.splice(center, 1, -1) //middle
        gameboard.row8.splice(right, 1, 1) //left  
    } else if (gameboard.row7.includes(-1)) {
        frogger.previousColorRight = gameboard.row7[right]
        gameboard.row7.splice(right, 1, frogger.previousColorRight) //right
        gameboard.row7.splice(center, 1, -1) //middle
        gameboard.row7.splice(left, 1, 1) //left  
    } else if (gameboard.row6.includes(-1)) {
        frogger.previousColorLeft = gameboard.row6[left]
        gameboard.row6.splice(left, 1, frogger.previousColorLeft) //right
        gameboard.row6.splice(center, 1, -1) //middle
        gameboard.row6.splice(right, 1, 1) //left  
    } else if (gameboard.row5.includes(-1)) {
        frogger.previousColorRight = gameboard.row5[right]
        gameboard.row5.splice(right, 1, frogger.previousColorRight) //right
        gameboard.row5.splice(center, 1, -1) //middle
        gameboard.row5.splice(left, 1, 1) //left  
    } else if (gameboard.row4.includes(-1)) {
        frogger.previousColorLeft = gameboard.row4[left]
        gameboard.row4.splice(left, 1, frogger.previousColorLeft) //right
        gameboard.row4.splice(center, 1, -1) //middle
        gameboard.row4.splice(right, 1, 1) //left  
    } else if (gameboard.row3.includes(-1)) {
        frogger.previousColorRight = gameboard.row3[right]
        gameboard.row3.splice(right, 1, frogger.previousColorRight) //right
        gameboard.row3.splice(center, 1, -1) //middle
        gameboard.row3.splice(left, 1, 1) //left  
    } else if (gameboard.row2.includes(-1)) {
        frogger.previousColorLeft = gameboard.row2[left]
        gameboard.row2.splice(left, 1, frogger.previousColorLeft) //right
        gameboard.row2.splice(center, 1, -1) //middle
        gameboard.row2.splice(right, 1, 1) //left  
    } else if (gameboard.row1.includes(-1)) {
        frogger.previousColorRight = gameboard.row1[right]
        gameboard.row1.splice(right, 1, frogger.previousColorRight) //right
        gameboard.row1.splice(center, 1, -1) //middle
        gameboard.row1.splice(left, 1, 1) //left  
    }
}

const entranceRamp = (arr) => {
    let car
    let diceRoll = Math.floor(Math.random() * 6) + 1
    if (diceRoll === 3 || diceRoll === 4) {
        car = Math.floor(Math.random() * 10) + 4
        arr.push(car)
    } else {
        arr.push(1)
    } 
        arr.shift()
}

const exitRamp = (arr) => {
    let car
    let diceRoll = Math.floor(Math.random() * 6) + 1
    if (diceRoll === 3 || diceRoll === 4) {
        car = Math.floor(Math.random() * 10) + 4
        arr.unshift(car)
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
        boardHTML.classList.remove('open')
        modal.classList.remove('close')
        winnerModal.classList.add('open')
    } else if (level === 2) {
        clearInterval(trafficInterval)
        boardHTML.classList.remove('open')
        replayModal.classList.add('open')
        modal.classList.remove('close')
    }
    
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
    boardHTML.classList.remove('open')
    modal.classList.remove('close')
    gameOverModal.classList.add('open')
}