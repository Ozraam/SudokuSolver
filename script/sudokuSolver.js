class Sudoku {
    constructor(grid) {
        this.grid = grid;
        if(grid == null) {
            this.grid = new Array(9).fill(0).map(() => new Array(9).fill(0));
        }
    }

    solve(istart = 0) {
        let grid = this.grid;
        for (let i = istart; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0) {
                    for (let k = 1; k <= 9; k++) {
                        if (this.isPossible(i, j, k)) {
                            grid[i][j] = k;
                            if (this.solve(i)) {
                                return true;
                            }
                            grid[i][j] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    isPossible(i, j, k) {
        let grid = this.grid;
        if (grid[i][j] !== 0 && grid[i][j] !== k) {
            return false;
        }
        for (let m = 0; m < 9; m++) {
            
            if (grid[i][m] === k && m !== j) {
                return false;
            }

            if (grid[m][j] === k && m !== i) { 
                return false;
            }
        }
        let x = Math.floor(i / 3) * 3;
        let y = Math.floor(j / 3) * 3;
        for (let m = 0; m < 3; m++) {
            for (let n = 0; n < 3; n++) {
                if (grid[x + m][y + n] === k && (x + m !== i && y + n !== j)) {
                    return false;
                }
            }
        }
        return true;
    }

    generate() {
        let grid = this.grid;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0 && Math.random() < 0.1) {
                    let k = Math.floor(Math.random() * 9) + 1;
                    let max = 0;
                    while (!this.isPossible(i, j, k) && max < 100) {
                        k = Math.floor(Math.random() * 9) + 1;
                        max++;
                    }
                    if(max < 100) {
                        grid[i][j] = k;
                    }
                }
            }
        }
    }

    // function to check if the board is solved and posible
    isSolved() {
        let grid = this.grid;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0 || !this.isPossible(i, j, grid[i][j])) {
                    
                    return false;
                }
            }
        }
        return true;
    }
}