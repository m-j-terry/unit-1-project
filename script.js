/*----- constants -----*/
const colors = {
3: "rgb(180,130,110)", //ground
0: "rgb(100,149,237)", //water
1: "gray", //lily-pads/logs
"-1": "green", //frogger
4: "yellow",
5: "red",
6: "orange",
7: "purple",
8: "navy",
9: "brown",
10: "white",
};

/*----- state variables -----*/

class Row {
constructor(data, next = null) {
    (this.data = data), (this.next = next);
}
}

class Column {
    constructor(data, next = null) {
        (this.data = data), (this.next = next);
    }
    }

class RowLinkedList {
    constructor() {
        this.head = null;
    }
    insertFirst(data) {
        const newHead = new Row(data, this.head);
        this.head = newHead;
    }
    size() {
        let counter = 0;
        let currentRow = this.head;
        while (currentRow) {
        counter++;
        currentRow = currentRow.next;
        }
        return counter;
    }
    getFirst() {
        return this.head;
    }
    getFirstData() {
        let row = this.getFirst();
        return row.data;
    }
    getAt(idx) {
        let counter = 0;
        let currentRow = this.head;
        while (currentRow) {
        if (counter === idx) {
            return currentRow;
        }
        counter++;
        currentRow = currentRow.next;
        }
        return null;
    }
    getData(idx) {
        let row = this.getAt(idx);
        return row.data;
    }
    getLast() {
        let counter = 0;
        let currentRow = this.head;
        while (currentRow.next != null) {
        counter++;
        currentRow = currentRow.next;
        }
        return currentRow;
    }
    getLastData() {
        let row = this.getLast();
        return row.data;
    }
    removeAt(idx) {
        //removes the Row at the index specified (if 9 is input, Row at 9 will be removed.)
        if (!this.head) {
        return;
        }
        if (idx === 0) {
        this.head = this.head.next;
        return;
        }
        let counter = 0;
        let currentRow = this.head;

        while (currentRow) {
        if (counter === idx - 1) {
            currentRow.next = null;
        }
        counter++;
        currentRow = currentRow.next;
        }
        return null;
    }
    insertLast(data) {
        let last = this.getLast();
        last.next = new Row(data);
        return this.getLast();
    }
    removeLast() {
        let newLast = getAt(this.size - 1)
        console.log(newLast);

        lnewLast.next = null;
        return this.getLast();
    }
    clear() {}
}

class ColumnLinkedList {
    constructor() {
        this.head = null;
    }
    insertFirst(data) {
        const newHead = new Column(data, this.head);
        this.head = newHead;
    }
    size() {
        let counter = 0;
        let currentColumn = this.head;
        while (currentColumn) {
        counter++;
        currentColumn = currentColumn.next;
        }
        return counter;
    }
    getFirst() {
        return this.head;
    }
    getFirstData() {
        let column = this.getFirst();
        return column.data;
    }
    getAt(idx) {
        let counter = 0;
        let currentColumn = this.head;
        while (currentColumn) {
        if (counter === idx) {
            return currentColumn;
        }
        counter++;
        currentColumn = currentColumn.next;
        }
        return null;
    }
    getData(idx) {
        let column = this.getAt(idx);
        return column.data;
    }
    getLast() {
        let counter = 0;
        let currentColumn = this.head;
        while (currentColumn.next != null) {
        counter++;
        currentColumn = currentColumn.next;
        }
        return currentColumn;
    }
    getLastData() {
        let column = this.getLast();
        return column.data;
    }
    removeAt(idx) {
        //removes the Column at the index specified (if 9 is input, Column at 9 will be removed.)
        if (!this.head) {
        return;
        }
        if (idx === 0) {
        this.head = this.head.next;
        return;
        }
        let counter = 0;
        let currentColumn = this.head;

        while (currentColumn) {
        if (counter === idx - 1) {
            currentColumn.next = null;
        }
        counter++;
        currentColumn = currentColumn.next;
        }
        return null;
    }
    leap(idx) {
        let column = this.getAt(idx);
        column.data = -1; 
        return
    }
    replaceColor(idx) {
        let column = this.getAt(idx);
        column.data = frogger.previousColor;
        return
    }
    insertLast(data) {
        let last = this.getLast();
        last.next = new Column(data);
        return this.getLast();
    }
    removeLast() {
        let newLast = this.getAt(this.size - 1)
        console.log(newLast);

        newlast.next = null;
        return this.getLast();
    }
    clear() {}
}

let boardInterval;
let carSplatCol;

const board = new RowLinkedList()
const rowType = new RowLinkedList()
const direction = new RowLinkedList()

let row1
let row2
let row3
let row4
let row5
let row6
let row7
let row8
let row9
let row10
let row11
let eastWest = -1
let highScore = 0
let frogHop;
let intervalSpeed = 1000;
let frogger = {
    number: -1,
    life: 1,
    column: 6,
    previousColor: 3,
    hopBack: 0,
    rows: 0,
    score: 0,
    /* Hopping functions as methods */
    hopForward() {
        let nextRow = board.getData(8)
        let currentRow = board.getData(9)
        this.hopBack === 0 ? this.score++ : this.hopBack--
        nextRow.getData(this.column - 1) === 0 ? gameOver() : this.life = 1
        //Check if frogger is jumping into a space occupied by a car
        if (nextRow.getData(this.column - 1) === 4 || nextRow.getData(this.column - 1) === 5 || nextRow.getData(this.column - 1) === 6 || nextRow.getData(this.column - 1) === 7 || nextRow.getData(this.column - 1) === 8 || nextRow.getData(this.column - 1) === 9 || nextRow.getData(this.column - 1) === 10) {
            gameOver()
        }
        currentRow.replaceColor(this.column -1)
        console.log(`column = ${this.column}`)
        console.log(`leap = ${nextRow.getAt(this.column)}`)
        this.previousColor = nextRow.getData(this.column - 1)
        // this.previousColorLeft = null
        // this.previousColorRight = nextRow.getData(this.column)
        nextRow.leap(this.column - 1)

        scrollDown()
        updateHighScore()
        hop.play()
        renderBoard()
    },
    hopLeft() {
        let currentRow = board.getData(9)
        currentRow.getData(this.column - 2) === 0 ? gameOver() : this.life = 1
        //Check if frogger is jumping into a space occupied by a car
        if (currentRow.getData(this.column - 1) === 4 || currentRow.getData(this.column - 1) === 5 || currentRow.getData(this.column - 1) === 6 || currentRow.getData(this.column - 1) === 7 || currentRow.getData(this.column - 1) === 8 || currentRow.getData(this.column - 1) === 9 || currentRow.getData(this.column - 1) === 10) {
            gameOver()
        }
        currentRow.replaceColor(this.column - 1)
        this.column = this.column - 1
        this.previousColor = currentRow.getData(this.column - 1)
        // this.previousColorLeft = currentRow.getData(this.column)
        // this.previousColorRight = currentRow.getData(this.column + 1)
        currentRow.leap(this.column - 1)

        hop.play()
    renderBoard()
    },
    hopRight() {
        let currentRow = board.getData(9)
        currentRow.getData(this.column) === 0 ? gameOver() : this.life = 1
        // Check if frogger is jumping into a space occupied by a car
        if (currentRow.getData(this.column - 1) === 4 || currentRow.getData(this.column - 1) === 5 || currentRow.getData(this.column - 1) === 6 || currentRow.getData(this.column - 1) === 7 || currentRow.getData(this.column - 1) === 8 || currentRow.getData(this.column - 1) === 9 || currentRow.getData(this.column - 1) === 10) {
            gameOver()
        }

        currentRow.replaceColor(this.column - 1)
        this.column = this.column + 1
        this.previousColor = currentRow.getData(this.column - 2)
        // this.previousColorLeft = null
        // this.previousColorRight = currentRow.getData(this.column - 1)
        currentRow.leap(this.column - 1)

        hop.play()
        renderBoard()
    },
    hopBackward() {
        let currentRow = board.getData(9)
        let previousRow = board.getData(10)
        previousRow.getData(this.column - 1) === 0 ? gameOver() : this.life = 1
        // Check if frogger is jumping into a space occupied by a car
        if (previousRow.getData(this.column - 1) === 4 || previousRow.getData(this.column - 1) === 5 || previousRow.getData(this.column - 1) === 6 || previousRow.getData(this.column - 1) === 7 || previousRow.getData(this.column - 1) === 8 || previousRow.getData(this.column - 1) === 9 || previousRow.getData(this.column - 1) === 10) {
            gameOver()
        }
        if (frogger.rows === 0) {
            alert('Uh Oh! frogger needs to move forward!')
        } else {

            currentRow.replaceColor(this.column - 1)
            this.previousColor = previousRow.getData(this.column - 1)
            // this.previousColorLeft = null
            // this.previousColorRight = previousRow.getData(this.column)
            previousRow.leap(this.column - 1)

            this.hopBack++

            scrollUp()
            hop.play()
            renderBoard()
        }
    },
    reset() {
        this.column = 6
        this.life = -1
        this.score = 0
        this.hopBack = 0
        this.rows = 0
    }
}

function updateHighScore() {
    frogger.score > highScore ? highScore++ : highScore = highScore
}

function boardReset() {
    carSplatCol = null, 
    board.clear()
    
}

/*----- cached elements  -----*/
const modal = document.querySelector(".modal");
const startModal = document.querySelector("#startGameModal");
const easyBtn = document.querySelector("#easyButton");
const mediumBtn = document.querySelector("#mediumButton");
const hardBtn = document.querySelector("#hardButton");
const legendaryBtn = document.querySelector("#legendaryButton");
const playBtn = document.querySelector("#playButton");
const tryAgainBtn = document.querySelector("#tryAgainButton");
const gameOverModal = document.querySelector("#gameOverModal");
const upButton = document.querySelector("#top");
const downButton = document.querySelector("#bottom");
const leftButton = document.querySelector("#left");
const rightButton = document.querySelector("#right");
const gamePad = document.querySelector(".gameButtons");

const boardHTML = document.querySelector("#gameboard");

/*----- audio files -----*/
const intro = document.querySelector("#intro");
const hop = document.querySelector("#hop");
const plunk = document.querySelector("#plunk");
const theme = document.querySelector("#theme");

/*----- event listeners -----*/
addEventListener("keydown", (event) => {
    if (event.code == "ArrowUp" || event.code == "KeyW") {
        frogger.hopForward();
    } else if (event.code == "ArrowDown" || event.code == "KeyS") {
        frogger.hopBackward();
    } else if (event.code == "ArrowLeft" || event.code == "KeyA") {
        frogger.hopLeft();
    } else if (event.code == "ArrowRight" || event.code == "KeyD") {
        frogger.hopRight();
    }
});

upButton.addEventListener("click", (e) => {
    frogger.hopForward();
});
downButton.addEventListener("click", (e) => {
    frogger.hopBackward();
});
leftButton.addEventListener("click", (e) => {
    frogger.hopLeft();
});
rightButton.addEventListener("click", (e) => {
    frogger.hopRight();
});

easyBtn.addEventListener("click", (e) => {
    easyBtn.classList.add("speed");
    mediumBtn.classList.remove("speed");
    hardBtn.classList.remove("speed");
    legendaryBtn.classList.remove("speed");
    intervalSpeed = 1500;
});

mediumBtn.addEventListener("click", (e) => {
    mediumBtn.classList.add("speed");
    easyBtn.classList.remove("speed");
    hardBtn.classList.remove("speed");
    legendaryBtn.classList.remove("speed");
    intervalSpeed = 900;
});

hardBtn.addEventListener("click", (e) => {
    hardBtn.classList.add("speed");
    easyBtn.classList.remove("speed");
    mediumBtn.classList.remove("speed");
    legendaryBtn.classList.remove("speed");
    intervalSpeed = 650;
});

legendaryBtn.addEventListener("click", (e) => {
    legendaryBtn.classList.add("speed");
    easyBtn.classList.remove("speed");
    mediumBtn.classList.remove("speed");
    hardBtn.classList.remove("speed");
    intervalSpeed = 300;
});

playBtn.addEventListener("click", (e) => {
    intro.pause();
    startModal.classList.add("close");
    modal.classList.add("close");
    gamePad.classList.add("open");
    init();
});

tryAgainBtn.addEventListener("click", (e) => {
    gameOverModal.classList.remove("open");
    modal.classList.add("close");
    gamePad.classList.add("open");
    init();
});

/*----- functions -----*/

/* board functions */
function init() {
    boardHTML.classList.add("open");
    frogger.reset();
    boardReset();
    generateBoard()
    console.log(board);
    render();
}

function generateBoard() {
    row11 = new ColumnLinkedList()
    row11.insertFirst(3)
    row11.insertFirst(3)
    row11.insertFirst(3)
    row11.insertFirst(3)
    row11.insertFirst(3)
    row11.insertFirst(3)
    row11.insertFirst(3)
    row11.insertFirst(3)
    row11.insertFirst(3)
    row11.insertFirst(3)
    board.insertFirst(row11)
    direction.insertFirst(0)
    rowType.insertFirst('ground')
    row10 = new ColumnLinkedList()
    row10.insertFirst(3)
    row10.insertFirst(3)
    row10.insertFirst(3)
    row10.insertFirst(3)
    row10.insertFirst(-1)
    row10.insertFirst(3)
    row10.insertFirst(3)
    row10.insertFirst(3)
    row10.insertFirst(3)
    row10.insertFirst(3)
    board.insertFirst(row10)
    direction.insertFirst(0)
    rowType.insertFirst('ground')
    generateRow()
    generateRow()
    generateRow()
    generateRow()
    generateRow()
    generateRow()
    generateRow()
    generateRow()
    generateRow()
    row1 = board.getData(0) //idx 0
    row2 = board.getData(1) //idx 1
    row3 = board.getData(2) //idx 2
    row4 = board.getData(3) //idx 3
    row5 = board.getData(4) //idx 4
    row6 = board.getData(5) //idx 5
    row7 = board.getData(6) //idx 6
    row8 = board.getData(7) //idx 7
    row9 = board.getData(8) //idx 8
    row10 = board.getData(9) //idx 9
    row11 = board.getData(10) //idx 10
}

function generateRow() {
    let rowTypeNum = Math.floor(Math.random() * 7) + 1
    let row = new ColumnLinkedList()
    if (rowTypeNum === 1) {
        row.insertFirst(3)
        row.insertFirst(3)
        row.insertFirst(3)
        row.insertFirst(3)
        row.insertFirst(3)
        row.insertFirst(3)
        row.insertFirst(3)
        row.insertFirst(3)
        row.insertFirst(3)
        row.insertFirst(3)
        direction.insertFirst(0)
        rowType.insertFirst('ground')
    } else if (rowTypeNum === 2 || rowTypeNum === 3 || rowTypeNum === 4) {
        pattern = Math.floor(Math.random() * 7) + 1
        if (pattern === 1) {
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(1)
        } else if (pattern === 2) {
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(1)
        } else if (pattern === 3) {
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(1)
        } else if (pattern === 4) {
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(0)
        } else if (pattern === 5) {
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(0)
        } else if (pattern === 6) {
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(0)
        } else if (pattern === 7) {
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(1)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(0)
            row.insertFirst(0)
        }
        rowType.insertFirst('river')
        direction.insertFirst(eastWest)
        eastWest *= -1
    } else if (rowTypeNum === 5 || rowTypeNum === 6 || rowTypeNum === 7) {
        pattern = Math.floor(Math.random() * 3) + 1
        console.log("pattern" + pattern)
        if (pattern === 1) {
            row.insertFirst(1)
            row.insertFirst(1)
            row.insertFirst(9)
            row.insertFirst(1)
            row.insertFirst(6)
            row.insertFirst(1)
            row.insertFirst(4)
            row.insertFirst(1)
            row.insertFirst(1)
            row.insertFirst(1)
        } else if (pattern === 2) {
            row.insertFirst(4)
            row.insertFirst(10)
            row.insertFirst(9)
            row.insertFirst(1)
            row.insertFirst(7)
            row.insertFirst(1)
            row.insertFirst(1)
            row.insertFirst(8)
            row.insertFirst(1)
            row.insertFirst(1)
        } else if (pattern === 3) {
            row.insertFirst(10)
            row.insertFirst(1)
            row.insertFirst(5)
            row.insertFirst(1)
            row.insertFirst(1)
            row.insertFirst(8)
            row.insertFirst(6)
            row.insertFirst(1)
            row.insertFirst(1)
            row.insertFirst(5)
        }
        rowType.insertFirst('road')
        direction.insertFirst(eastWest)
        eastWest *= -1
    }
    board.insertFirst(row)
}

function render() {
    if (intervalSpeed === null) {
        intervalSpeed = 1000;
    }
    renderBoard();
    boardInterval = setInterval(riverFlow, intervalSpeed);
    theme.play();
}

function scrollDown() {
    if (frogger.hopBack > 0) {
        board.insertFirst(board.getLastData())
        board.removeAt(board.size - 1)
        direction.insertFirst(direction.getLastData())
        direction.removeAt(board.size - 1)
        rowType.insertFirst(rowType.getLastData())
        rowType.removeAt(board.size - 1)
        // frogger.hopBack-- see frogger.hopForward()
    } else {
        generateRow()
    }
    frogger.rows++
}

function scrollUp() {
  // frogger.hopBack++ See frogger.hopBackward()
    board.insertLast(board.getData(0))
    board.removeAt(0)
    direction.insertLast(direction.getData(0))
    direction.removeAt(0)
    rowType.insertLast(direction.getData(0))
    rowType.removeAt(0)
    frogger.rows--
}


function renderBoard() {
    for (let j = 0; j < 11; j++) {
        generateRows(j)
        function generateRows(boardNum) {
            for (let i = 0; i < 10; i++) {
                let row = board.getData(boardNum)
                const cellEl = document.getElementById("c" + i + "r" + boardNum)
                cellEl.style.backgroundColor = colors[row.getData(i)]
            }
        }
    }
    console.log(board)
    document.querySelector("#score").innerHTML = `SCORE: ${frogger.score}   /`
    document.querySelector("#highscore").innerHTML = `/  HIGHSCORE: ${highScore}`
}


/* Interval */
function riverFlow() {  //write functionality to handle Frogger getting pushed off the board.
    let right = frogger.column
    let left = frogger.column - 2
    let currentRow = board.getData(9)
    for (let i = 0; i < 11; i++) {
        console.log(direction.getData(i))
        let row = board.getData(i)
        console.log(`${i} at ${row.size()}`)
    switch (rowType.getData(i)) {
        case 'river':
            let row = board.getData(i)
            let column = row.getAt(frogger.column - 1)
            direction.getData(i) === 1 ? (row.insertFirst(row.getData(9)) && row.removeAt(10)) : (row.insertLast(row.getFirstData()) && row.removeAt(0))
            froggerLogger(i) 
            break
        case 'road':
            direction.getData(i) === 1 ? exitRamp(i) :  entranceRamp(i)
            carSplat(i)
            break
        default:
            console.log(`row${i} is ${rowType.getData(i)}`)
        }
    }
    renderBoard()
}

function froggerLogger(number) {
    (number === 9) ? (direction.getData(number) === 1 ? frogger.column++ : frogger.column--) : frogger.column
}

function carSplat(rowNum) {
    if ((rowNum = 9 && carSplatCol === 4) ||
    carSplatCol === 5 ||
    carSplatCol === 6 ||
    carSplatCol === 7 ||
    carSplatCol === 8 ||
    carSplatCol === 9 ||
    carSplatCol === 10)
    {
        gameOver();
    }
}

function entranceRamp(rowNum){
    console.log("entranceRamp")

    let row = board.getData(rowNum)
    let car
    let diceRoll = Math.floor(Math.random() * 6) + 1
    if (diceRoll === 3 || diceRoll === 4) {
        car = Math.floor(Math.random() * 10) + 4
        row.insertLast(car)
    } else {
        car = 1 //objectively not a car number, but helpful for writing the ternary that handles carsplat column at edge case when Frogger is on the edge of the board
        row.insertLast(car)
    } 
    if (rowNum === 9) {
        frogger.column === 10 ? carSplatCol = car : carSplatCol = row.getData(frogger.column)
        row.leap(frogger.column)
        row.replaceColor(frogger.column - 1)
    }
    row.removeAt(0)
}

function exitRamp(rowNum) {
    console.log("exitRamp")
    let row = board.getData(rowNum)
    let car
    let diceRoll = Math.floor(Math.random() * 6) + 1
    if (diceRoll === 3 || diceRoll === 4) {
        car = Math.floor(Math.random() * 10) + 4
        row.insertFirst(car)
    } else {
        car = 1 //objectively not a car number, but helpful for writing the ternary that handles carsplat column at edge case when Frogger is on the edge of the board
        row.insertFirst(car)
    } 
    if (rowNum === 9) {
        frogger.column === 1 ? carSplatCol = car : carSplatCol = row.getData(frogger.column - 1)
        row.leap(frogger.column - 1)
        row.replaceColor(frogger.column)
    }
    row.removeAt(10)
}

/* scoring functions */

const checkScore = () => {
    if (frogger.life === 0) {
        gameOver();
    } else if (board[9].includes(-1) === false) {
        gameOver();
    }
};

function gameOver() {
    clearInterval(boardInterval);
    boardReset();
    frogger.reset();
    theme.pause();
    plunk.play();
    boardHTML.classList.remove("open");
    modal.classList.remove("close");
    gameOverModal.classList.add("open");
    gamePad.classList.remove("open");
}
