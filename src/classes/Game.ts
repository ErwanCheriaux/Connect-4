enum BoardItem {
    ' ' = 0,
    'X' = 1,
    'O' = 2,
}

class Game {
    private board: number[][] = [];

    constructor() {
        this.board = Array(6)
            .fill(null)
            .map(() => Array(7).fill(0));
    }

    public printBoard() {
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
