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
        for (let row = 6; row--; row > 0) {
            if (!this.board[row][col]) {
                this.board[row][col] = BoardItem.USER;
                return;
            }
        }
        throw new Error('Column full already!');
    }

    public printBoard(): string[] {
        const screen: string[] = Array(6).fill('');
        this.board.forEach((row, n) => {
            screen[n] += '|';
            row.forEach((col) => {
                screen[n] += ScreenItem[col] + '|';
            });
        });

        return screen;
    }
}

export const game = new Game();
export { GameStatus };
