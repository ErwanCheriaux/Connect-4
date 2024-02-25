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
        if (this.status === GameStatus.HOUSE) {
            throw new Error("Not user's turn!");
        }

        if (this.status === GameStatus.WIN || this.status === GameStatus.LOSE) {
            throw new Error('The game is over!');
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

        throw new Error('Oops! Something went wrong...');
    }

    public houseMove(): void {
        if (this.status === GameStatus.USER) {
            throw new Error("Not house's turn!");
        }

        if (this.status === GameStatus.WIN || this.status === GameStatus.LOSE) {
            throw new Error('The game is over!');
        }

        const columnsToPlay: number[] = [];
        const safeColumnsToPlay: number[] = [];
        for (let col = 0; col < BOARD_SIZE_COL; col++) {
            if (!this.board[0][col]) columnsToPlay.push(col);
        }

        if (!columnsToPlay.length) {
            throw new Error('The board is full, house cannot play');
        }

        // search best move
        for (const col of columnsToPlay) {
            for (let row = BOARD_SIZE_ROW - 1; row >= 0; row--) {
                if (!this.board[row][col]) {
                    // find the move to win
                    if (this.hasConnect4(row, col, BoardItem.HOUSE, true)) {
                        this.board[row][col] = BoardItem.HOUSE;
                        this.status = GameStatus.LOSE;
                        return;
                    }

                    // find the move to not lose
                    else if (this.hasConnect4(row, col, BoardItem.USER, true)) {
                        this.board[row][col] = BoardItem.HOUSE;
                        this.status = GameStatus.USER;
                        return;
                    }

                    // exclude columns where playing will make the user win
                    else if (!row || !this.hasConnect4(row - 1, col, BoardItem.USER, true)) {
                        safeColumnsToPlay.push(col);
                    }

                    break;
                }
            }
        }

        let col: number;
        if (safeColumnsToPlay.length) {
            // play random but safe
            const index: number = Math.floor(Math.random() * safeColumnsToPlay.length);
            col = safeColumnsToPlay[index];
        } else {
            // play random, but you lost already and you know it!
            const index: number = Math.floor(Math.random() * columnsToPlay.length);
            col = columnsToPlay[index];
        }

        for (let row = BOARD_SIZE_ROW - 1; row >= 0; row--) {
            if (!this.board[row][col]) {
                this.board[row][col] = BoardItem.HOUSE;
                this.status = GameStatus.USER;
                return;
            }
        }

        throw new Error('Oops! Something went wrong...');
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

    /**
     * Return true if the player has a connect for based on it moves in the board at row and col.
     * If assumption is true, the player has not played yet but wants to know the outcome if it does so.
     *
     * @private
     * @param {number} row
     * @param {number} col
     * @param {BoardItem} player
     * @param {boolean} [assumption=false]
     * @returns {boolean}
     */
    private hasConnect4(row: number, col: number, player: BoardItem, assumption: boolean = false): boolean {
        let line: string;
        let rowIndex: number;
        let colIndex: number;

        // horizontal
        line = '';
        for (let index = 0; index < BOARD_SIZE_COL; index++) {
            if (assumption && index === col) line += player.toString();
            else line += this.board[row][index].toString();
        }

        if (line.includes((player * 1111).toString())) return true;

        // vertical
        line = '';
        for (let index = 0; index < BOARD_SIZE_ROW; index++) {
            if (assumption && index === row) line += player.toString();
            else line += this.board[index][col].toString();
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
            if (assumption && rowIndex === row && colIndex === col) line += player.toString();
            else line += this.board[rowIndex][colIndex].toString();
            rowIndex++;
            colIndex++;
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
            if (assumption && rowIndex === row && colIndex === col) line += player.toString();
            else line += this.board[rowIndex][colIndex].toString();
            rowIndex--;
            colIndex++;
        }

        if (line.includes((player * 1111).toString())) return true;

        // no connect 4 detected
        return false;
    }
}

export const game = new Game();
export { GameStatus };
