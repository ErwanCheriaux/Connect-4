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
        const defensiveColumnsToPlay: number[] = [];
        const offensiveColumnsToPlay: number[] = [];

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

                        // include columns where the user make a connect3
                        if (this.hasConnect4(row, col, BoardItem.USER, true, 3)) {
                            defensiveColumnsToPlay.push(col);
                        }

                        // include columns where the house make a connect3
                        if (this.hasConnect4(row, col, BoardItem.HOUSE, true, 3)) {
                            offensiveColumnsToPlay.push(col);
                        }
                    }

                    break;
                }
            }
        }

        let col: number;
        if (defensiveColumnsToPlay.length) {
            // play random but blocking opponent strategy
            const index: number = Math.floor(Math.random() * defensiveColumnsToPlay.length);
            col = defensiveColumnsToPlay[index];
        } else if (offensiveColumnsToPlay.length) {
            // play random but smart
            const index: number = Math.floor(Math.random() * offensiveColumnsToPlay.length);
            col = offensiveColumnsToPlay[index];
        } else if (safeColumnsToPlay.length) {
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
     * Return true if the player has a Connect4 based on its moves on the board at the specified row and column.
     * If assumption is true, the player has not yet played but wants to know the outcome if they do so.
     * By default, the function searches for Connect4, as the name suggests, but it can search for any size.
     */
    private hasConnect4(
        row: number,
        col: number,
        player: BoardItem,
        assumption: boolean = false,
        size: number = 4,
    ): boolean {
        let line: string;
        let middle: number;
        let rowIndex: number;
        let colIndex: number;
        const pattern: string = player.toString().repeat(size);

        // horizontal
        line = '';
        middle = col;
        for (let index = 0; index < BOARD_SIZE_COL; index++) {
            if (assumption && index === col) line += player.toString();
            else line += this.board[row][index].toString();
        }

        line = line.slice(Math.max(0, middle - size + 1), Math.min(middle + size, line.length));
        if (line.includes(pattern)) return true;

        // vertical
        line = '';
        middle = row;
        for (let index = 0; index < BOARD_SIZE_ROW; index++) {
            if (assumption && index === row) line += player.toString();
            else line += this.board[index][col].toString();
        }

        line = line.slice(Math.max(0, middle - size + 1), Math.min(middle + size, line.length));
        if (line.includes(pattern)) return true;

        // diagonal left-up to right-down
        line = '';
        middle = 0;
        rowIndex = row;
        colIndex = col;

        while (rowIndex > 0 && colIndex > 0) {
            middle++;
            rowIndex--;
            colIndex--;
        }

        while (rowIndex < BOARD_SIZE_ROW && colIndex < BOARD_SIZE_COL) {
            if (assumption && rowIndex === row && colIndex === col) line += player.toString();
            else line += this.board[rowIndex][colIndex].toString();
            rowIndex++;
            colIndex++;
        }

        line = line.slice(Math.max(0, middle - size + 1), Math.min(middle + size, line.length));
        if (line.includes(pattern)) return true;

        // diagonal left-down to right-up
        line = '';
        middle = 0;
        rowIndex = row;
        colIndex = col;

        while (rowIndex < BOARD_SIZE_ROW - 1 && colIndex > 0) {
            middle++;
            rowIndex++;
            colIndex--;
        }

        while (rowIndex >= 0 && colIndex < BOARD_SIZE_COL) {
            if (assumption && rowIndex === row && colIndex === col) line += player.toString();
            else line += this.board[rowIndex][colIndex].toString();
            rowIndex--;
            colIndex++;
        }

        line = line.slice(Math.max(0, middle - size + 1), Math.min(middle + size, line.length));
        if (line.includes(pattern)) return true;

        // no pattern detected
        return false;
    }
}

export const game = new Game();
export { GameStatus };
