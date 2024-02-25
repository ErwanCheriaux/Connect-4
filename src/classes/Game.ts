const BOARD_SIZE_COL = 7;
const BOARD_SIZE_ROW = 6;

enum BoardItem {
    EMPTY = 0,
    USER = 1,
    HOUSE = 2,
}

enum ScreenItem {
    ' ' = BoardItem.EMPTY,
    'X' = BoardItem.USER,
    'O' = BoardItem.HOUSE,
}

enum GameStatus {
    NEW, // new game, any player can start
    USER, // user's turn
    HOUSE, // house's turn
    WIN, // user won the game
    LOSE, // user lost the game
}

class Game {
    private board: number[][] = [];
    private status: GameStatus = GameStatus.NEW;

    constructor() {
        this.newGame();
    }

    public newGame(): void {
        this.status = GameStatus.NEW;
        this.board = Array(BOARD_SIZE_ROW)
            .fill(null)
            .map(() => Array(BOARD_SIZE_COL).fill(BoardItem.EMPTY));
    }

    public getStatus(): GameStatus {
        return this.status;
    }

    public userMove(col: number): void {
        if (this.status !== GameStatus.NEW && this.status !== GameStatus.USER) {
            throw new Error("Not user's turn!");
        }

        if (this.board[0][col]) {
            throw new Error('Column full already!');
        }

        for (let row = BOARD_SIZE_ROW - 1; row >= 0; row--) {
            if (!this.board[row][col]) {
                //play
                this.board[row][col] = BoardItem.USER;

                // check
                if (this.hasConnect4(row, col, BoardItem.USER)) {
                    this.status = GameStatus.WIN;
                } else {
                    this.status = GameStatus.HOUSE;
                }

                return;
            }
        }
    }

    public houseMove(): void {
        if (this.status !== GameStatus.NEW && this.status !== GameStatus.HOUSE) {
            throw new Error("Not house's turn!");
        }

        const notFullcolumns: number[] = [];
        for (let col = 0; col < BOARD_SIZE_COL; col++) {
            if (!this.board[0][col]) notFullcolumns.push(col);
        }

        if (!notFullcolumns.length) {
            throw new Error('The board is full, house cannot play');
        }

        const index: number = Math.floor(Math.random() * notFullcolumns.length);
        const col: number = notFullcolumns[index];

        for (let row = BOARD_SIZE_ROW - 1; row >= 0; row--) {
            if (!this.board[row][col]) {
                // play
                this.board[row][col] = BoardItem.HOUSE;

                // check
                if (this.hasConnect4(row, col, BoardItem.HOUSE)) {
                    this.status = GameStatus.LOSE;
                } else {
                    this.status = GameStatus.USER;
                }

                return;
            }
        }
    }

    public printBoard(): string {
        let screen: string = '';
        this.board.forEach((row) => {
            screen += '|';
            row.forEach((col) => {
                screen += ScreenItem[col] + '|';
            });
            screen += '\n';
        });

        return screen;
    }

    private hasConnect4(row: number, col: number, player: BoardItem): boolean {
        let line: string;
        let rowIndex: number;
        let colIndex: number;

        // horizontal
        line = '';
        for (let index = 0; index < BOARD_SIZE_COL; index++) {
            line += this.board[row][index].toString();
        }

        if (line.includes((player * 1111).toString())) return true;

        // vertical
        line = '';
        for (let index = 0; index < BOARD_SIZE_ROW; index++) {
            line += this.board[index][col].toString();
        }

        if (line.includes((player * 1111).toString())) return true;

        // diagonal left-up to right-down
        line = '';
        rowIndex = row;
        colIndex = col;

        while (rowIndex > 0 && colIndex > 0) {
            rowIndex--;
            colIndex--;
        }

        while (rowIndex < BOARD_SIZE_ROW && colIndex < BOARD_SIZE_COL) {
            line += this.board[rowIndex++][colIndex++].toString();
        }

        if (line.includes((player * 1111).toString())) return true;

        // diagonal left-down to right-up
        line = '';
        rowIndex = row;
        colIndex = col;

        while (rowIndex < BOARD_SIZE_ROW - 1 && colIndex > 0) {
            rowIndex++;
            colIndex--;
        }

        while (rowIndex > 0 && colIndex < BOARD_SIZE_COL) {
            line += this.board[rowIndex--][colIndex++].toString();
        }

        if (line.includes((player * 1111).toString())) return true;

        // no connect 4 detected
        return false;
    }
}

export const game = new Game();
export { GameStatus };
