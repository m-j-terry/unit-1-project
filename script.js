/*----- constants -----*/
const colors = {
3: "rgb(180,130,110)", // ground
0: "rgb(100,149,237)", // water
1: "gray", // lily-pads/logs
"-1": "green", // frogger
4: "yellow", // car
5: "red", // car
6: "orange", // car
7: "purple", // car
8: "navy", // car
9: "brown", // car
10: "white", // car
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

//counter-intuitively, ColumnLinkedList keeps track of each of the 'column' spaces on within a row. It is used to to create the x-axis of the gameboard and each of the nodes within a ColumnLinkedList represents an index on the row.
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
let difficulty = "easy";
let highScores = []
let lowestHighScore = {}
let highScoresLength = 0
let disableKeys = false
let carSplatCol;

// board represents the physical board that the user sees. However, there are two other linked lists that track different properties of the board: 1) type(river, road, ground), this is important because each one has different properties for handling frogger's movement. 2) direction: this is crucial for the river sections: if you have two river sections going the same direction, the game would be impossible.
const board = new RowLinkedList()
const rowType = new RowLinkedList()
const direction = new RowLinkedList()

// the board consists of 11 rows; see generateBoard() to see how these board elements are created.
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
    number: -1, // see colors object above.
    life: 1,
    column: 6, // keeps track of which y-axis column Frogger occupies.
    previousColor: 3,// previousColor is used to replace the color of the square from which Frogger is jumping.
    hopBack: 0, // hopBack keeps track of how many spaces frogger has hopped backward; this is to keep the score from going up when frogger jumps forward again; score only increases if hopBack = 0.
    rows: 0, // used to keep track of how far from the start frogger has jumped; alerts that frogger cannot jump backward from the starting space.
    score: 0,
    /* Hopping functions as methods */
    hopForward() {
        let nextRow = board.getData(8)
        let currentRow = board.getData(9)
        this.hopBack === 0 ? this.score++ : this.hopBack-- // either frogger's score goes up when hopping forward or the hopBack gets closer to 0 (where the score can start to increase again)
        nextRow.getData(this.column - 1) === 0 ? gameOver() : this.life = 1
        //Check if frogger is jumping into a space occupied by a car
        if (nextRow.getData(this.column - 1) === 4 || nextRow.getData(this.column - 1) === 5 || nextRow.getData(this.column - 1) === 6 || nextRow.getData(this.column - 1) === 7 || nextRow.getData(this.column - 1) === 8 || nextRow.getData(this.column - 1) === 9 || nextRow.getData(this.column - 1) === 10) {
            gameOver()
        }
        currentRow.replaceColor(this.column -1) // replaceColor is a linkedList method.
        this.previousColor = nextRow.getData(this.column - 1) //
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
const addScoreModal = document.querySelector("#addScoreModal")
const allTimeHighScores = document.querySelector(".highScores")
const scoreForm = document.querySelector("#scoreForm")
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
    if (disableKeys === false && (event.code == "ArrowUp" || event.code == "KeyW")) {
        frogger.hopForward();
    } else if (disableKeys === false && (event.code == "ArrowDown" || event.code == "KeyS")) {
        frogger.hopBackward();
    } else if (disableKeys === false && (event.code == "ArrowLeft" || event.code == "KeyA")) {
        frogger.hopLeft();
    } else if (disableKeys === false && (event.code == "ArrowRight" || event.code == "KeyD")) {
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
    difficulty = "easy";
    intervalSpeed = 1500;
});

mediumBtn.addEventListener("click", (e) => {
    mediumBtn.classList.add("speed");
    easyBtn.classList.remove("speed");
    hardBtn.classList.remove("speed");
    legendaryBtn.classList.remove("speed");
    difficulty = "medium";
    intervalSpeed = 900;
});

hardBtn.addEventListener("click", (e) => {
    hardBtn.classList.add("speed");
    easyBtn.classList.remove("speed");
    mediumBtn.classList.remove("speed");
    legendaryBtn.classList.remove("speed");
    difficulty = "hard";
    intervalSpeed = 650;
});

legendaryBtn.addEventListener("click", (e) => {
    legendaryBtn.classList.add("speed");
    easyBtn.classList.remove("speed");
    mediumBtn.classList.remove("speed");
    hardBtn.classList.remove("speed");
    difficulty = "legendary";
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

scoreForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based (0-11), so add 1
    const day = today.getDate();
    const formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    try {
        const formData = new FormData(scoreForm)
        formData.append('score', frogger.score)
        formData.append('difficulty', difficulty)
        formData.append('date', formattedDate)
        console.log('formData:');
        for (const pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        const data = {
            name: formData.get('name'),
            score: formData.get('score'),
            difficulty: formData.get('difficulty'),
            date: formData.get('date')
        }

        const response = await fetch(`https://nodejs-serverless-function-express-frogger.vercel.app/api/score/${difficulty}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error("Failed to add score");
        }
        console.log("Score added successfully");
        scoreForm.reset(); // Reset the form
        // reset the highScores
        fetchAndHandleHighScores();
        // set the gameOverModal
        addScoreModal.classList.remove("open");
        gameOverModal.classList.add("open");
    } catch (error) {
        console.error("Error:", error);
    }
})

/*----- functions -----*/

/* highScore Functions */
//set highscores
async function setHighScores() {
    try {
        const response = await fetch(`https://nodejs-serverless-function-express-frogger.vercel.app/api/score/${difficulty}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error to propagate it to the caller
    }
}
function setInnerHTML(arr){
    let scoreDisplays = arr.map((score) => `
        <div class="scoreDisplay">
            <p>${score.name}</p>
            <p>${score.score}</p>
            <p>${score.difficulty}</p>
            <p>${new Date(score.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
        </div>
    `)
    const scoresHTML = scoreDisplays.join('')
    console.log(scoresHTML)
    allTimeHighScores.innerHTML = scoresHTML
}

async function fetchAndHandleHighScores() {
    try {
        const highScoresLocal = await setHighScores(); // Wait for the Promise to resolve
        highScores = highScoresLocal
        console.log(highScores); // Log the scores
        setInnerHTML(highScoresLocal)
        lowestHighScore = highScores[highScores.length - 1]
        highScoresLength = highScores.length
    } catch (error) {
        console.error('Error:', error);
    }
}

/* board functions */
function init() {
    fetchAndHandleHighScores();
    frogger.score = 0
    disableKeys = false

    boardHTML.classList.add("open");
    frogger.reset();
    boardReset();
    generateBoard()
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
    // 1/7 chance of new row being a 'ground' row.
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
        // 3/7 chance of the row being a 'river' row
    } else if (rowTypeNum === 2 || rowTypeNum === 3 || rowTypeNum === 4) {
        pattern = Math.floor(Math.random() * 7) + 1
        // 7 different river type patterns
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
        // 3/7 chance of a row being a 'road'
    } else if (rowTypeNum === 5 || rowTypeNum === 6 || rowTypeNum === 7) {
        pattern = Math.floor(Math.random() * 3) + 1
        // three different road starting patterns
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
    // new row is inserted as the head of the board
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
    document.querySelector("#score").innerHTML = `SCORE: ${frogger.score}   /`
    document.querySelector("#highscore").innerHTML = `/  HIGHSCORE: ${highScore}`
}



/* Interval */
function riverFlow() {  
    for (let i = 0; i < 11; i++) {
        // Looks at each row of the board and then handles the movement according to the row's direction.
        switch (rowType.getData(i)) {
            case 'river': // handles frogger floating on river.
                let row = board.getData(i)
                direction.getData(i) === 1 ? (row.insertFirst(row.getData(9)) && row.removeAt(10)) : (row.insertLast(row.getFirstData()) && row.removeAt(0))
                froggerLogger(i) 
                break
            case 'road': // simulates cars 'driving' and checking to see if frogger was 'hit' by a car
                direction.getData(i) === 1 ? exitRamp(i) :  entranceRamp(i)
                carSplat(i)
                break
            default:
        }
    }
    renderBoard()
}

function froggerLogger(number) {
    // handles frogger floating on river.
    (number === 9) ? (direction.getData(number) === 1 ? frogger.column++ : frogger.column--) : frogger.column
}

function carSplat(rowNum) {
    //checking to see if frogger was 'hit' by a car
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
    // moves cars from right to left.
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
        // if frogger is in the car row, leap() will simulate frogger-stasis as the cars move.
        frogger.column === 10 ? carSplatCol = car : carSplatCol = row.getData(frogger.column)
        row.leap(frogger.column)
        row.replaceColor(frogger.column - 1)
    }
    row.removeAt(0)
}

function exitRamp(rowNum) {
    // moves cars from left to right
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
        // if frogger is in the car row, leap() will simulate frogger-stasis as the cars move.
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
    console.log(lowestHighScore)
    if (highScore > lowestHighScore.score && highScoresLength >= 10){
        // Delete number 10 from highScores
        async function deleteOne() {
            try {
                const response = await fetch(`https://nodejs-serverless-function-express-frogger.vercel.app/api/score/${difficulty}`, {
                    method: "DELETE"
                });
        
                if (!response.ok) {
                    throw new Error('Failed to delete resource');
                }
        
                console.log('Resource deleted successfully');
            } catch (error) {
                console.error('Error:', error);
            }
        }

        deleteOne()

        disableKeys = true

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // Months are zero-based (0-11), so add 1
        const day = today.getDate();
        const formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
        addScoreModal.classList.add("open")

        document.querySelector("#date").value = formattedDate
        document.querySelector("#scoreSubmit").value = highScore
        document.querySelector("#difficulty").value = difficulty
    } else if (highScore > lowestHighScore.score) {
        disableKeys = true

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // Months are zero-based (0-11), so add 1
        const day = today.getDate();
        const formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
        addScoreModal.classList.add("open")

        const dateInput = document.querySelector("#date");
        dateInput.value = formattedDate;
        dateInput.disabled = true;
        
        const scoreSubmitInput = document.querySelector("#scoreSubmit");
        scoreSubmitInput.value = score;
        scoreSubmitInput.disabled = true;
        
        const difficultyInput = document.querySelector("#difficulty");
        difficultyInput.value = difficulty;
        difficultyInput.disabled = true;
        addScoreModal.classList.add("open")
    } else {
        gameOverModal.classList.add("open");
    }
    gamePad.classList.remove("open");
}