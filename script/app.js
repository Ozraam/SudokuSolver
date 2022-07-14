function main() {
    createBoard();
}

function createBoard() {
    const game = document.getElementById("game");
    const board = document.createElement("div");
    board.classList.add("board");

    // Create rows and add them to the board
    for(let i = 0; i < 9; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        row.id = "row" + i;
        board.appendChild(row);
        // Create cells and add them to the row
        for (let u = 0; u < 9; u++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add(`${(i + u)%2 === 0 ? "white" : "black"}`);

            i === 2 || i === 5 ? cell.classList.add("top") : null;
            u === 2 || u === 5 ? cell.classList.add("left") : null;
            
            
            cell.id = "cell" + i + u;
            row.appendChild(cell);
            cell.addEventListener("click", () => selectCell(i, u));
        }
    }
    game.appendChild(board);
}

function clearBoard() {
    const board = document.getElementById("game");
    board.innerHTML = "";
    createBoard();
}

function solveBoard() {
    
    const sudoku = new Sudoku(getBoard());
    sudoku.solve();
    const solvedBoard = sudoku.grid;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`cell${i}${j}`).innerHTML = solvedBoard[i][j];
        }
    }
}

function getBoard() {
    const board = document.getElementById("game");
    const cells = board.getElementsByClassName("cell");
    let boardArray = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            const value = cells[i * 9 + j].innerHTML;
            if (value === "") {
                row.push(0);
            } else {
                row.push(parseInt(value));
            }
        }
        boardArray.push(row);
    }
    return boardArray;
}

function generate() {
    const sudoku = new Sudoku();
    sudoku.generate();
    const board = sudoku.grid;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`cell${i}${j}`).innerHTML = board[i][j] === 0 ? "" : board[i][j];
            document.getElementById(`cell${i}${j}`).classList.remove("selected");

            document.getElementById(`cell${i}${j}`).classList.remove("locked");
            if(board[i][j] !== 0) document.getElementById(`cell${i}${j}`).classList.add("locked");

            lockedCell[i][j] = board[i][j] === 0 ? false : true;
        }
    }
    
}

function selectCell(x, y) {
    
    if(!lockedCell[x][y]) {
        if(selectedCell !== null) {
            selectedCell.classList.remove("selected");
        }

        

        const cell = document.getElementById(`cell${x}${y}`);

        if(selectedCell === cell) {
            selectedCell = null;
            return;
        }

        selectedCell = cell;
        cell.classList.add("selected");
        cell.focus();
    }
}

// write in the selected cell the user inputs
function writeInCell(event) {
    const cell = event.target;
    const value = event.key;
    if (value === "Backspace") {
        cell.innerHTML = "";
    } else if (value === "Delete") {
        cell.innerHTML = "";
    } else if (value === "Enter") {
        cell.innerHTML = "";
    } else if (value === " ") {
        cell.innerHTML = "";
    } else if (value === "0") {
        cell.innerHTML = "";
    }
    else if (value === "1") {
        cell.innerHTML = "1";
    }
    else if (value === "2") {
        cell.innerHTML = "2";
    }
    else if (value === "3") {
        cell.innerHTML = "3";
    }
    else if (value === "4") {
        cell.innerHTML = "4";
    }
    else if (value === "5") {
        cell.innerHTML = "5";
    }
    else if (value === "6") {
        cell.innerHTML = "6";
    }
    else if (value === "7") {
        cell.innerHTML = "7";
    }
    else if (value === "8") {
        cell.innerHTML = "8";
    }
    else if (value === "9") {
        cell.innerHTML = "9";
    }
}


main()

let selectedCell = null;
let lockedCell = Array(9).fill(null).map(() => Array(9).fill(false));

document.addEventListener("keydown", (event) => {
    if (selectedCell !== null) {
        writeInCell({target: selectedCell, key: event.key});
    }
});

document.addEventListener("click", (event) => {
    // check if the user not clicked on the board
    if(event.target.classList.contains("cell")) {
        return
    }
    
    if (selectedCell !== null) {
        selectedCell.classList.remove("selected");
        selectedCell = null;
    }
});

// connect button to clear board
document.getElementById("clear").addEventListener("click", clearBoard);

// connect button to solve board
document.getElementById("solve").addEventListener("click", solveBoard);

// connect button to generate board
document.getElementById("generate").addEventListener("click", generate);

// connect button to check if board is solved
document.getElementById("check").addEventListener("click", function() {
    const sudoku = new Sudoku(getBoard());
    if (sudoku.isSolved()) {
        alert("Board is solved");
    } else {
        alert("Board is not solved");
    }
});

