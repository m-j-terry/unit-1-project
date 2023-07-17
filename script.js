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
// let intervalSpeed = 1000
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
        frogger.hopBack === 0 ? frogger.score++ : frogger.hopBack--
        //change frogger square color to preset value.
        frogHop.splice(frogger.column -1, 1, frogger.previousColor)
        frogger.row = frogger.row -1
        //record the color of the square that frogger will jump to and see if Frogger fell in the water or not. If frogger is 
        frogHop = board[frogger.row]
        if (frogHop[frogger.column - 1] === 4 || frogHop[frogger.column - 1] === 5 || frogHop[frogger.column - 1] === 6 || frogHop[frogger.column - 1] === 7 || frogHop[frogger.column - 1] === 8 || frogHop[frogger.column - 1] === 9 || frogHop[frogger.column - 1] === 10) {
            gameOver()
        }
        frogger.previousColor = frogHop[frogger.column -1]
        frogger.life = frogger.life * frogHop[frogger.column -1]
        //change the color of the space frogger jumps to//set log interval to keep track of the indexof the log frogger jumped on.
        frogHop.splice(frogger.column -1, 1, frogger.number)
        frogger.row = 9
        gameboard.scrollDown()
        hop.play()
        renderBoard()
    },
    hopLeft() {
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
    },
    hopRight() {
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
    },
    hopBackward(){
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
        frogger.row = 9
        frogger.hopBack++
        gameboard.scrollUp()
        hop.play()
        renderBoard()
    },
    reset(){
        frogger.row = 9
        frogger.column = 6
        frogger.previousColor = 3
        frogger.previousColorLeft = null
        frogger.previousColorRight = null
        frogger.life = -1
        frogger.score = 0
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

// let gameboardType
// let row
let boardInterval
let trafficInterval
let carSplatCol
let carSplatRow

let gameboard = {
    board: [],
    cachedRows: [],
    direction: [],
    cachedDirection: [],
    eastWest: -1,

    scrollDown() {
        if (frogger.hopBack > 0) {
            gameboard.cachedRows.push(gameboard.board[10])
            gameboard.board.pop()
            gameboard.board.unshift(cachedRows[0])
            gameboard.cachedRows.shift()
            
            gameboard.cachedDirection.push(gameboard.direction[10])
            gameboard.direction.pop()
            gameboard.direction.unshift(cachedDirections[0])
            gameboard.cachedDirection.shift()
        } else {
            gameboard.cachedRows.push(gameboard.board[10])
            gameboard.board.pop()
            gameboard.cachedDirection.push(gameboard.direction[10])
            gameboard.direction.pop()
            gameboard.generateRow()
        }
        frogger.rows++
    },
    scrollUp() {
        if (frogger.rows === 0) { 
            alert('Uh Oh! frogger needs to move forward!') 
        } else {
            frogger.hopBack++
            gameboard.cachedRows.unshift(gameboard.board[0])
            gameboard.cachedDirection.unshift(gameboard.direction[0])
            gameboard.board.shift()
            gameboard.direction.shift()
            gameboard.board.push(gameboard.cachedRows)
            frogger.rows--
        }
    },
    generateRow() {
        let rowNum = Math.floor(Math.random() * 7) + 1
        if (rowNum === 1) {
            gameboard.direction.unshift(0)
            gameboard.board.unshift([3, 3, 3, 3, 3, 3, 3, 3, 3, 3])
        } else if (rowNum === 2 || rowNum === 3 || rowNum === 4) {
            pattern = Math.floor(Math.random() * 7) + 1
            if (pattern === 1) {
                gameboard.direction.unshift(gameboard.eastWest)
                gameboard.board.unshift(riverPatterns.one)
                gameboard.eastWest *= -1
            } else if (pattern === 2) {
                gameboard.direction.unshift(gameboard.eastWest)
                gameboard.board.unshift(riverPatterns.two)
                gameboard.eastWest *= -1
            } else if (pattern === 3) { 
                gameboard.direction.unshift(gameboard.eastWest)
                gameboard.board.unshift(riverPatterns.three)
                gameboard.eastWest *= -1
            } else if (pattern === 4) {
                gameboard.direction.unshift(gameboard.eastWest)
                gameboard.board.unshift(riverPatterns.four) 
                gameboard.eastWest *= -1
            } else if (pattern === 5) {
                gameboard.direction.unshift(gameboard.eastWest)
                gameboard.board.unshift(riverPatterns.five) 
                gameboard.eastWest *= -1
            } else if (pattern === 6) {
                gameboard.direction.unshift(gameboard.eastWest)
                gameboard.board.unshift(riverPatterns.six) 
                gameboard.eastWest *= -1
            } else if (pattern === 7) {
                gameboard.direction.unshift(gameboard.eastWest)
                gameboard.board.unshift(riverPatterns.seven) 
                gameboard.eastWest *= -1
            }
        } else if (rowNum === 5 || rowNum === 6 || rowNum === 7) {
            pattern = Math.floor(Math.random() * 3) + 1
            if (pattern === 1) {
                gameboard.direction.unshift(gameboard.eastWest)
                gameboard.board.unshift(roadPatterns.one)
                gameboard.eastWest *= -1
            } else if (pattern === 2) {
                gameboard.direction.unshift(gameboard.eastWest)
                gameboard.board.unshift(roadPatterns.two)
                gameboard.eastWest *= -1
            } else if (pattern === 3) {
                gameboard.direction.unshift(gameboard.eastWest)
                gameboard.board.unshift(roadPatterns.three)
                gameboard.eastWest *= -1
            }
        }
    },
    generateBoard() {
        gameboard.board.push( [3, 3, 3, 3, 3, -1, 3, 3, 3, 3], [3, 3, 3, 3, 3, 3, 3, 3, 3, 3])
        gameboard.direction.push(0, 0)
        for (let i = 0; i < 9; i++) {
            gameboard.generateRow()
        }
        console.log(gameboard.board, gameboard.direction)
    },
    reset() {
        gameboard.board = []
        gameboard.cachedRows = []
        gameboard.direction = []
        gameboard.cachedDirection = []
        gameboard.eastWest = -1
        carSplatRow = null
        carSplatCol = null
    }
}

// gameboard.generateBoard()

/*----- cached elements  -----*/
// const modal = document.querySelector('.modal')
// const startModal = document.querySelector('#startGameModal')
// const easyBtn = document.querySelector('#easyButton')
// const mediumBtn = document.querySelector('#mediumButton')
// const hardBtn = document.querySelector('#hardButton')
// const legendaryBtn = document.querySelector('#legendaryButton')
// const playBtn = document.querySelector('#playButton')
// const tryAgainBtn = document.querySelector('#tryAgainButton')
// const gameOverModal = document.querySelector('#gameOverModal')
// const upButton = document.querySelector('#top')
// const downButton = document.querySelector('#bottom')
// const leftButton = document.querySelector('#left')
// const rightButton = document.querySelector('#right')

// const boardHTML = document.querySelector('#gameboard')

/*----- audio files -----*/
// const intro = document.querySelector('#intro')
// const hop = document.querySelector('#hop')
// const plunk = document.querySelector('#plunk')
// const theme = document.querySelector('#theme')

/*----- event listeners -----*/
// addEventListener('keydown', (event) => {
//     if (event.code == 'ArrowUp' || event.code == 'KeyW') {
//         frogger.hopForward()
//     } else if (event.code == 'ArrowDown' || event.code == 'KeyS') {
//         frogger.hopBackward()
//     } else if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
//         frogger.hopLeft()
//     } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
//         frogger.hopRight()
//     }
// })

addEventListener('click', (event) => {
    if (event === upButton) {
        frogger.hopForward
    }
})

// easyBtn.addEventListener('click', (e) => {
//     easyBtn.classList.add('speed')
//     mediumBtn.classList.remove('speed')
//     hardBtn.classList.remove('speed')
//     legendaryBtn.classList.remove('speed')
//     console.log(intervalSpeed)
//     intervalSpeed = 1500
//     console.log(intervalSpeed)
// })

// mediumBtn.addEventListener('click', (e) => {
//     mediumBtn.classList.add('speed')
//     easyBtn.classList.remove('speed')
//     hardBtn.classList.remove('speed')
//     legendaryBtn.classList.remove('speed')
//     console.log(intervalSpeed)
//     intervalSpeed = 900
//     console.log(intervalSpeed)
// })

// hardBtn.addEventListener('click', (e) => {
//     hardBtn.classList.add('speed')
//     easyBtn.classList.remove('speed')
//     mediumBtn.classList.remove('speed')
//     legendaryBtn.classList.remove('speed')
//     console.log(intervalSpeed)
//     intervalSpeed = 650
//     console.log(intervalSpeed)
// })

// legendaryBtn.addEventListener('click', (e) => {
//     legendaryBtn.classList.add('speed')
//     easyBtn.classList.remove('speed')
//     mediumBtn.classList.remove('speed')
//     hardBtn.classList.remove('speed')
//     console.log(intervalSpeed)
//     intervalSpeed = 300
//     console.log(intervalSpeed)
// })

// playBtn.addEventListener('click', (e) => {
//     intro.pause()
//     startModal.classList.add('close')
//     modal.classList.add('close')
//     init() 
// })

// playAgainBtn.addEventListener('click', (e) => {
//     startModal.classList.remove('close')
//     intro.play()
// })

// tryAgainBtn.addEventListener('click', (e) => {
//     gameOverModal.classList.remove('open')
//     modal.classList.add('close')
//     init() 
// })


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
        boardInterval = setInterval(riverFlow, intervalSpeed)     
    theme.play()
}

// NOTE TO SELF: Make four buttons (style them to look really cool like an arcade! be sure to style them with breakpoints so they only display for smaller screen sizes) that allow digital users on their phones to 'click' and play (which means adding these buttons to the event listeners)

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
    document.querySelector("score").innerHTML = `${frogger.score}`
    frogger.score > highScore ? highScore = frogger.score : highScore = highScore
}

/* riverInterval */
function riverFlow() {
    checkScore()
    let right = frogger.column
    let left = frogger.column - 2
    for (let i = 0; i < gameboard.board.length; i++) {
        //river()
        if (gameboard.board[i].includes(0) === true) {
            if (gameboard.direction[i] === -1){
                if (gameboard.board[i] === riverPatterns.one) {

                } else if (gameboard.board[i] === riverPatterns.two) {

                } else if (gameboard.board[i] === riverPatterns.three) {

                } else if (gameboard.board[i] === riverPatterns.four) {

                } else if (gameboard.board[i] === riverPatterns.five) {

                } else if (gameboard.board[i] === riverPatterns.six) {

                } else if (gameboard.board[i] === riverPatterns.seven) {
                
                }
                froggerLogger()
            } else if (gameboard.direction[i] === 1) {
                if (gameboard.board[i] === riverPatterns.one) {

                } else if (gameboard.board[i] === riverPatterns.two) {

                } else if (gameboard.board[i] === riverPatterns.three) {

                } else if (gameboard.board[i] === riverPatterns.four) {

                } else if (gameboard.board[i] === riverPatterns.five) {

                } else if (gameboard.board[i] === riverPatterns.six) {

                } else if (gameboard.board[i] === riverPatterns.seven) {
                
                }
                froggerLogger()
            } 
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
            // if (gameboard.row1[6] === 1 || gameboard.row1[6] === -1) {
            //     gameboard.row1.push(1)
            // } else {
            //     gameboard.row1.push(0)
            // }
            // gameboard.row1.shift()

            // if (gameboard.row2[3] === 1 || gameboard.row2[3] === -1) {
            //     gameboard.row2.unshift(1)
            // } else {
            //     gameboard.row2.unshift(0)
            // }
            // gameboard.row2.pop()

            // if (gameboard.row3[7] === 1 || gameboard.row3[7] === -1){
            //     gameboard.row3.push(1)
            // } else {
            //     gameboard.row3.push(0)
            // }
            // gameboard.row3.shift()

            // if (gameboard.row6[3] === 1 || gameboard.row6[3] === -1) {
            //     gameboard.row6.unshift(1)
            // } else {
            //     gameboard.row6.unshift(0)
            // }
            // gameboard.row6.pop()

            // if (gameboard.row7[6] === 1 || gameboard.row7[6] === -1) {
            //     gameboard.row7.push(1)
            // } else {
            //     gameboard.row7.push(0)
            // }
            // gameboard.row7.shift()

            // if (gameboard.row9[2] === 1 || gameboard.row9[2] === -1) {
            //     gameboard.row9.unshift(1)
            // } else {
            //     gameboard.row9.unshift(0)
            // }
            // gameboard.row9.pop()

        
    //traffic()
    // let right = frogger.column
    // let left = frogger.column - 2
    checkScore()
    renderBoard()
}

function froggerLogger() {
    if (gameboard.board[9].includes(0) === true) {
        gameboard.direction[9] === -1 ? frogger.columnn-- : frogger.column++
    }
}

/* trafficInterval */

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
    
    // else if (gameboard.row8.includes(-1)) {
    //     frogger.previousColorLeft = gameboard.row8[left]
    //     gameboard.row8.splice(left, 1, frogger.previousColorLeft) //right
    //     gameboard.row8.splice(center, 1, -1) //middle
    //     gameboard.row8.splice(right, 1, 1) //left  
    // } else if (gameboard.row7.includes(-1)) {
    //     frogger.previousColorRight = gameboard.row7[right]
    //     gameboard.row7.splice(right, 1, frogger.previousColorRight) //right
    //     gameboard.row7.splice(center, 1, -1) //middle
    //     gameboard.row7.splice(left, 1, 1) //left  
    // } else if (gameboard.row6.includes(-1)) {
    //     frogger.previousColorLeft = gameboard.row6[left]
    //     gameboard.row6.splice(left, 1, frogger.previousColorLeft) //right
    //     gameboard.row6.splice(center, 1, -1) //middle
    //     gameboard.row6.splice(right, 1, 1) //left  
    // } else if (gameboard.row5.includes(-1)) {
    //     frogger.previousColorRight = gameboard.row5[right]
    //     gameboard.row5.splice(right, 1, frogger.previousColorRight) //right
    //     gameboard.row5.splice(center, 1, -1) //middle
    //     gameboard.row5.splice(left, 1, 1) //left  
    // } else if (gameboard.row4.includes(-1)) {
    //     frogger.previousColorLeft = gameboard.row4[left]
    //     gameboard.row4.splice(left, 1, frogger.previousColorLeft) //right
    //     gameboard.row4.splice(center, 1, -1) //middle
    //     gameboard.row4.splice(right, 1, 1) //left  
    // } else if (gameboard.row3.includes(-1)) {
    //     frogger.previousColorRight = gameboard.row3[right]
    //     gameboard.row3.splice(right, 1, frogger.previousColorRight) //right
    //     gameboard.row3.splice(center, 1, -1) //middle
    //     gameboard.row3.splice(left, 1, 1) //left  
    // } else if (gameboard.row2.includes(-1)) {
    //     frogger.previousColorLeft = gameboard.row2[left]
    //     gameboard.row2.splice(left, 1, frogger.previousColorLeft) //right
    //     gameboard.row2.splice(center, 1, -1) //middle
    //     gameboard.row2.splice(right, 1, 1) //left  
    // } else if (gameboard.row1.includes(-1)) {
    //     frogger.previousColorRight = gameboard.row1[right]
    //     gameboard.row1.splice(right, 1, frogger.previousColorRight) //right
    //     gameboard.row1.splice(center, 1, -1) //middle
    //     gameboard.row1.splice(left, 1, 1) //left  
    // }
// }

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
    theme.pause()
    plunk.play()
    boardHTML.classList.remove('open')
    modal.classList.remove('close')
    gameOverModal.classList.add('open')
}