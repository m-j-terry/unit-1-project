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

let highScore = 0
let innerArr
let frogHop
let intervalSpeed = 1000
let frogger = {
    number : -1,
    row : 9,
    column : 6,
    previousColor : 3,
    previousColorLeft : null,
    previousColorRight : null,
    life : -1,
    hopBack: 0,
    rows: 0,
    score: 0,
    /* Hopping functions as methods */
    hopForward() {
        this.hopBack === 0 ? this.score++ : this.hopBack--
        //change frogger square color to preset value.
        frogHop.splice(this.column -1, 1, this.previousColor)
        this.row = this.row -1
        //record the color of the square that frogger will jump to and see if Frogger fell in the water or not. If frogger is 
        frogHop = gameboard.board[this.row]
        if (frogHop[this.column - 1] === 4 || frogHop[this.column - 1] === 5 || frogHop[this.column - 1] === 6 || frogHop[this.column - 1] === 7 || frogHop[this.column - 1] === 8 || frogHop[this.column - 1] === 9 || frogHop[this.column - 1] === 10) {
            gameOver()
        }
        this.previousColor = frogHop[this.column -1]
        this.life *= frogHop[this.column -1]
        //change the color of the space frogger jumps to//set log interval to keep track of the indexof the log frogger jumped on.
        frogHop.splice(this.column -1, 1, this.number)
        this.row = 9
        gameboard.scrollDown()
        hop.play()
        renderBoard()
    },
    hopLeft() {
        //change frogger square color to preset value
        frogHop.splice(this.column -1, 1, this.previousColor)
        this.column = this.column - 1
        //record the color of the square that frogger will jump to and see ifFrogger fell in the water or not!
        frogHop = gameboard.board[this.row]
        if (frogHop[this.column - 1] === 4 || frogHop[this.column - 1] === 5 || frogHop[this.column - 1] === 6 || frogHop[this.column - 1] === 7 || frogHop[this.column - 1] === 8 || frogHop[this.column - 1] === 9 || frogHop[this.column - 1] === 10) {
            gameOver()
        }
        this.previousColor = frogHop[this.column -1]
        this.life = this.life * frogHop[this.column -1]
        //change the color of the space frogger jumps to
        frogHop.splice(this.column -1, 1, this.number)
        hop.play()
        renderBoard()
    },
    hopRight() {
        //change frogger square color to preset value
        frogHop.splice(this.column -1, 1, this.previousColor)
        this.column = this.column + 1
        //record the color of the square that frogger will jump to and see if Frogger fell in the water or not!
        frogHop = gameboard.board[this.row]
        if (frogHop[this.column -1] === 4 || frogHop[this.column -1] === 5 || frogHop[this.column -1] === 6 || frogHop[this.column -1] === 7 || frogHop[this.column -1] === 8 || frogHop[this.column -1] === 9 || frogHop[this.column -1] === 10) {
            gameOver()    
        }
        this.previousColor = frogHop[this.column -1]
        this.life = this.life * frogHop[this.column -1]
        //change the color of the space frogger jumps to.
        frogHop.splice(this.column -1, 1, this.number)
        hop.play()
        renderBoard()
    },
    hopBackward(){
        //change frogger square color to preset value
        frogHop.splice(this.column -1, 1, this.previousColor)
        this.row = this.row + 1
        //record the color of the square that frogger will jump to and see if Frogger fell in the water or not!
        frogHop = gameboard.board[this.row]
        if (frogHop[this.column - 1] === 4 || frogHop[this.column - 1] === 5 || frogHop[this.column - 1] === 6 || frogHop[this.column - 1] === 7 || frogHop[this.column - 1] === 8 || frogHop[this.column - 1] === 9 || frogHop[this.column - 1] === 10) {
            gameOver()
        }
        this.previousColor = frogHop[this.column -1]
        this.life = this.life * frogHop[this.column -1]
        //change the color of the space frogger jumps to.
        frogHop.splice(this.column -1, 1, this.number)
        this.row = 9
        this.hopBack++
        gameboard.scrollUp()
        hop.play()
        renderBoard()
    },
    reset(){
        this.row = 9
        this.column = 6
        this.previousColor = 3
        this.previousColorLeft = null
        this.previousColorRight = null
        this.life = -1
        this.score = 0
    }
}

const roadPatterns = {
    one : [1, 1, 1, 4, 1, 6, 1, 9, 1, 1],
    two : [1, 8, 1, 1, 7, 1, 9, 10, 1, 4], 
    three : [5, 1, 1, 6, 8, 1, 1, 5, 1, 10]
}

const riverPatterns = {
    one : [1, 0, 1, 0, 1, 0, 1, 0, 1, 0], 
    two : [1, 1, 0, 1, 1, 0, 1, 1, 0, 1], 
    three : [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    four : [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    five : [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    six : [0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    seven : [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
}

let boardInterval
let carSplatCol
let carSplatRow

let gameboard = {
    board: [],
    cachedRows: [],
    rowType: [],
    cachedRowType: [],
    direction: [],
    cachedDirection: [],
    eastWest: -1,

    scrollDown() {
        if (frogger.hopBack > 0) {
            this.cachedRows.push(this.board[10])
            this.board.pop()
            this.board.unshift(this.cachedRows[0])
            this.cachedRows.shift()
            
            this.cachedDirection.push(this.direction[10])
            this.direction.pop()
            this.direction.unshift(this.cachedDirection[0])
            this.cachedDirection.shift()

            this.cachedRowType.push(this.rowType[10])
            this.rowType.pop()
            this.rowType.unshift(this.cachedRowType[0])
            this.cachedRowType.shift()
        } else {
            this.cachedRows.push(this.board[10])
            this.board.pop()
            this.cachedDirection.push(this.direction[10])
            this.direction.pop()
            this.cachedRowType.push(this.rowType)
            this.rowType.pop()
            this.generateRow()
        }
        frogger.rows++
    },
    scrollUp() {
        if (frogger.rows === 0) { 
            alert('Uh Oh! frogger needs to move forward!') 
        } else {
            frogger.hopBack++
            this.cachedRows.unshift(this.board[0])
            this.cachedDirection.unshift(this.direction[0])
            this.cachedRowType.unshift(this.rowType[0])
            this.board.shift()
            this.direction.shift()
            this.rowType.shift()
            this.board.push(this.cachedRows[this.cachedRows.length - 1])
            this.rowType.push(this.cachedRowType[this.cachedRowType.length - 1])
            this.direction.push(this.cachedDirection[this.cachedDirection.length - 1])
            frogger.rows--
        }
    },
    generateRow() {
        let rowNum = Math.floor(Math.random() * 7) + 1
        if (rowNum === 1) {
            this.direction.unshift(0)
            this.board.unshift([3, 3, 3, 3, 3, 3, 3, 3, 3, 3])
            this.rowType.unshift('ground')
        } else if (rowNum === 2 || rowNum === 3 || rowNum === 4) {
            pattern = Math.floor(Math.random() * 7) + 1
            if (pattern === 1) {
                this.direction.unshift(this.eastWest)
                this.board.unshift(riverPatterns.one)
                this.eastWest *= -1
                this.rowType.unshift('riverOne')
            } else if (pattern === 2) {
                this.direction.unshift(this.eastWest)
                this.board.unshift(riverPatterns.two)
                this.eastWest *= -1
                this.rowType.unshift('riverTwo')
            } else if (pattern === 3) { 
                this.direction.unshift(this.eastWest)
                this.board.unshift(riverPatterns.three)
                this.eastWest *= -1
                this.rowType.unshift('riverThree')
            } else if (pattern === 4) {
                this.direction.unshift(this.eastWest)
                this.board.unshift(riverPatterns.four) 
                this.eastWest *= -1
                this.rowType.unshift('riverFour')
            } else if (pattern === 5) {
                this.direction.unshift(this.eastWest)
                this.board.unshift(riverPatterns.five) 
                this.eastWest *= -1
                this.rowType.unshift('riverFive')
            } else if (pattern === 6) {
                this.direction.unshift(this.eastWest)
                this.board.unshift(riverPatterns.six) 
                this.eastWest *= -1
                this.rowType.unshift('riverSix')
            } else if (pattern === 7) {
                this.direction.unshift(this.eastWest)
                this.board.unshift(riverPatterns.seven) 
                this.eastWest *= -1
                this.rowType.unshift('riverSeven')
            }
        } else if (rowNum === 5 || rowNum === 6 || rowNum === 7) {
            pattern = Math.floor(Math.random() * 3) + 1
            if (pattern === 1) {
                this.direction.unshift(this.eastWest)
                this.board.unshift(roadPatterns.one)
                this.eastWest *= -1
                this.rowType.unshift('roadOne')
            } else if (pattern === 2) {
                this.direction.unshift(this.eastWest)
                this.board.unshift(roadPatterns.two)
                this.eastWest *= -1
                this.rowType.unshift('roadTwo')
            } else if (pattern === 3) {
                this.direction.unshift(this.eastWest)
                this.board.unshift(roadPatterns.three)
                this.eastWest *= -1
                this.rowType.unshift('roadThree')
            }
        }
    },
    generateBoard() {
        this.board.push( [3, 3, 3, 3, 3, -1, 3, 3, 3, 3], [3, 3, 3, 3, 3, 3, 3, 3, 3, 3])
        this.direction.push(0, 0)
        this.rowType.push('ground', 'ground')
        for (let i = 0; i < 9; i++) {
            this.generateRow()
        }
        console.log(this.board, this.direction, this.rowType, riverPatterns, roadPatterns)
    },
    reset() {
        this.board = []
        this.cachedRows = []
        this.direction = []
        this.cachedDirection = []
        this.eastWest = -1
        carSplatRow = null
        carSplatCol = null
    }
}

// gameboard.generateBoard()

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
const upButton = document.querySelector('#top')
const downButton = document.querySelector('#bottom')
const leftButton = document.querySelector('#left')
const rightButton = document.querySelector('#right')
const gamePad = document.querySelector('.gameButtons')

const boardHTML = document.querySelector('#gameboard')

/*----- audio files -----*/
const intro = document.querySelector('#intro')
const hop = document.querySelector('#hop')
const plunk = document.querySelector('#plunk')
const theme = document.querySelector('#theme')

/*----- event listeners -----*/
addEventListener('keydown', (event) => {
    if (event.code == 'ArrowUp' || event.code == 'KeyW') {
        frogger.hopForward()
    } else if (event.code == 'ArrowDown' || event.code == 'KeyS') {
        frogger.hopBackward()
    } else if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
        frogger.hopLeft()
    } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
        frogger.hopRight()
    }
})

// addEventListener('click', (event) => {
//     if (event === upButton) {
//         frogger.hopForward
//     }
// })

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
    gamePad.classList.add('open')
    init() 
})

tryAgainBtn.addEventListener('click', (e) => {
    gameOverModal.classList.remove('open')
    modal.classList.add('close')
    gamePad.classList.add('open')
    init() 
})


/*----- functions -----*/ 

/* board functions */
function init() {
    boardHTML.classList.add('open')
    frogger.reset()
    gameboard.reset()
    // gameboard.setRows()
    gameboard.generateBoard()
    frogHop = gameboard.board[9]
    render()    
}

function render() {
    renderBoard()
    if (intervalSpeed === null) {
        intervalSpeed = 1000
    }
    renderBoard()
    // boardInterval = setInterval(riverFlow, intervalSpeed)     
    theme.play()
}


function renderBoard() {
    for (let i = 0; i < gameboard.board.length; i++) {
        innerArr = gameboard.board[i]
        console.log(innerArr)
        generateRow()
        function generateRow() {
            for (let i = 0; i < innerArr.length; i++) {
                const cellEl = document.getElementById("c" + i + "r" + gameboard.board.indexOf(innerArr))
                cellEl.style.backgroundColor = colors[innerArr[i]]
            }
        }
    }
    document.querySelector("#score").innerHTML = `${frogger.score}`
    frogger.score > highScore ? (document.querySelector("#highscore").innerHTML = `${frogger.score}`) : (document.querySelector("#highscore").innerHTML = `${highScore}`)
}
/* Interval */
function riverFlow() {
    let right = frogger.column
    let left = frogger.column - 2
    for (let i = 0; i < gameboard.board.length; i++) {
        //river
        if (gameboard.board[i].includes(0) === true) {
            if (gameboard.direction[i] === -1) {
                if (gameboard.rowType[i] === "riverOne") {
                    (gameboard.board[9][8] === 1 || gameboard.board[9][8] === -1) ? gameboard.board[9].push(1) : gameboard.board[9].push(0)
                    gameboard.board[9].shift()
                    console.log(`riverOne -1 at ${i}`)
                } else if (gameboard.rowType[i] === "riverTwo") {
                    (gameboard.board[9][6] === 1 || gameboard.board[9][6] === -1) ? gameboard.board[9].push(1) : gameboard.board[9].push(0)
                    gameboard.board[9].shift()
                    console.log(`riverTwo -1 at ${i}`)
                } else if (gameboard.rowType[i] === "riverThree") {
                    (gameboard.board[9][4] === 1 && gameboard.board[9][4] === -1) ? gameboard.board[9].push(1) : gameboard.board[9].push(0)
                    gameboard.board[9].shift()
                    console.log(`riverThree -1 at ${i}`)
                } else if (gameboard.rowType[i] === "riverFour") {
                    (gameboard.board[9][7] === 1 || gameboard.board[9][7] === -1) ? gameboard.board[9].push(1) : gameboard.board[9].push(0)
                    gameboard.board[9].shift()
                    console.log(`riverFour -1 at ${i}`)
                } else if (gameboard.rowType[i] === "riverFive") {
                    (gameboard.board[9][4] === 1 && gameboard.board[9][4] === -1) ? gameboard.board[9].push(1) : gameboard.board[9].push(0)
                    gameboard.board[9].shift()
                    console.log(`riverFive -1 at ${i}`)
                } else if (gameboard.rowType[i] === "riverSix") {
                    (gameboard.board[9][7] === 1 || gameboard.board[9][7] === -1) ? gameboard.board[9].push(1) : gameboard.board[9].push(0)
                    gameboard.board[9].shift()
                    console.log(`riverSix -1 at ${i}`)
                } else if (gameboard.rowType[i] === "riverSeven") {
                    (gameboard.board[9][3] === 1 || gameboard.board[9][3] === -1) ? gameboard.board[9].push(1) : gameboard.board[9].push(0)
                    gameboard.board[9].shift()  
                    console.log(`riverSeven -1 at ${i}`)
                }
            } else if (gameboard.direction[i] === 1) {
                if (gameboard.rowType[i] === "riverOne") {
                    gameboard.board[9][1] === 1 || gameboard.board[9][1] === -1 ? gameboard.board[9].unshift(1) : gameboard.board[9].unshift(0)
                    gameboard.board[9].pop()
                    console.log(`riverOne 1 at ${i}`)
                } else if (gameboard.rowType[i] === "riverTwo") {
                    (gameboard.board[9][4] === 1 || gameboard.board[9][4] === -1) ? gameboard.board[9].unshift(1) : gameboard.board[9].unshift(0)
                    gameboard.board[9].pop()
                    console.log(`riverTwo 1 at ${i}`)
                } else if (gameboard.rowType[i] === "riverThree") {
                    (gameboard.board[9][5] === 1 && gameboard.board[9][5] === -1) ? gameboard.board[9].unshift(1) : gameboard.board[9].unshift(0)
                    gameboard.board[9].pop()
                    console.log(`riverThree 1 at ${i}`)
                } else if (gameboard.rowType[i] === "riverFour") {
                    (gameboard.board[9][2] === 1 || gameboard.board[9][2] === -1) ? gameboard.board[9].unshift(1) : gameboard.board[9].unshift(0)
                    gameboard.board[9].pop()
                    console.log(`riverFour 1 at ${i}`)
                } else if (gameboard.rowType[i] === "riverFive") {
                    (gameboard.board[9][5] === 1 && gameboard.board[9][5] === -1) ? gameboard.board[9].unshift(1) : gameboard.board[9].unshift(0)
                    gameboard.board[9].pop()
                    console.log(`riverFive 1 at ${i}`)
                } else if (gameboard.rowType[i] === "riverSix") {
                    (gameboard.board[9][3] === 1 || gameboard.board[9][3] === -1) ? gameboard.board[9].unshift(1) : gameboard.board[9].unshift(0)
                    gameboard.board[9].pop()
                    console.log(`riverSix 1 at ${i}`)
                } else if (gameboard.rowType[i] === "riverSeven") {
                    (gameboard.board[9][5] === 1 || gameboard.board[9][5] === -1) ? gameboard.board[9].unshift(1) : gameboard.board[9].unshift(0)
                    gameboard.board[9].pop()
                    console.log(`riverSeven 1 at ${i}`)
                }
                froggerLogger()    
            } else if (gameboard.board[i].includes(0) === false && gameboard.board[i].includes(3) === false) {
                if (gameboard.direction[i] === -1) {
                carSplatCol = frogHop[right]
                carSplatRow = frogger.row 
                entranceRamp(gameboard.board[i])
                } else if (gameboard.direction[i] === 1){
                carSplatCol = frogHop[left]
                carSplatRow = frogger.row
                exitRamp(gameboard.board[i])
                }
                stationaryFrogger()
                carSplat()
            }   
        }
    }
    checkScore()
    renderBoard()
}

function froggerLogger() {
    if (gameboard.board[9].includes(0) === true) {
        gameboard.direction[9] === -1 ? frogger.columnn-- : frogger.column++
    }
}

function carSplat() {
    if (frogger.row === carSplatRow && carSplatCol === 4 || carSplatCol === 5 || carSplatCol === 6 || carSplatCol === 7 || carSplatCol === 8 || carSplatCol === 9 || carSplatCol === 10) {
        gameOver()
        }
}

function stationaryFrogger() {
    let right = frogger.column
    let left = frogger.column - 2       //possibly could turn these if else if statements dryer by using a for loop...
    let center = frogger.column - 1 
    // if (frogger.rows === 0) {
    //     frogger.previousColorRight = gameboard.board[9][right]
    //     gameboard.row9.splice(right, 1, frogger.previousColorRight) //right
    //     gameboard.row9.splice(center, 1, -1) //middle
    //     gameboard.row9.splice(left, 1, 1) //left        
    // } else if (gameboard.board[9].includes(0) === true) {
    //     if (gameboard.direction[9] === -1) {

    //     } else if (gameboard.direction[9] === 1) {
    //          
    //     }
    if (gameboard.direction[9] === -1) {
        frogger.previousColorRight = gameboard.board[9][right]
        gameboard.board[9].splice(right, 1, frogger.previousColorRight) //right
        gameboard.board[9].splice(center, 1, -1) //middle
        gameboard.board[9].splice(left, 1, 1) //left  
    } else if (gameboard.direction[9] === 1) {
        frogger.previousColorLeft = gameboard.board[9][left]
        gameboard.board[9].splice(left, 1, frogger.previousColorLeft) //right
        gameboard.board[9].splice(center, 1, -1) //middle
        gameboard.board[9].splice(right, 1, 1) //left  
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

/* scoring functions */

const checkScore = () => {
    if (frogger.life === 0 ) { 
        gameOver()
    } else if (gameboard.board[9].includes(-1) === false) {
        gameOver()
    }
}

function gameOver() {
    clearInterval(boardInterval)
    gameboard.reset()
    frogger.reset()
    theme.pause()
    plunk.play()
    boardHTML.classList.remove('open')
    modal.classList.remove('close')
    gameOverModal.classList.add('open')
    gamePad.classList.remove('open')
}