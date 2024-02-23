enum BoardItem {
    ' ' = 0,
    'X' = 1,
    'O' = 2,
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
            .map(() => Array(7).fill(0));
    }

    public getStatus(): GameStatus {
        return this.status;
    }

    public printBoard(): string[] {
        const screen: string[] = Array(6).fill('');
        this.board.forEach((row, n) => {
            screen[n] += '|';
            row.forEach((col) => {
                screen[n] += BoardItem[col] + '|';
            });
        });

        return screen;
    }
}

export const game = new Game();
export { GameStatus };
