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
        this.board = Array(6)
            .fill(null)
            .map(() => Array(7).fill(BoardItem.EMPTY));
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

        for (let row = 5; row >= 0; row--) {
            if (!this.board[row][col]) {
                this.board[row][col] = BoardItem.USER;
                this.status = GameStatus.HOUSE;
                return;
            }
        }
    }

    public houseMove(): void {
        if (this.status !== GameStatus.NEW && this.status !== GameStatus.HOUSE) {
            throw new Error("Not house's turn!");
        }

        const notFullcolumns: number[] = [];
        for (let col = 0; col < 7; col++) {
            if (!this.board[0][col]) notFullcolumns.push(col);
        }

        if (!notFullcolumns.length) {
            throw new Error('The board is full, house cannot play');
        }

        const index: number = Math.floor(Math.random() * notFullcolumns.length);
        const col: number = notFullcolumns[index];

        for (let row = 6; row--; row > 0) {
            if (!this.board[row][col]) {
                this.board[row][col] = BoardItem.HOUSE;
                this.status = GameStatus.USER;
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
}

export const game = new Game();
export { GameStatus };
