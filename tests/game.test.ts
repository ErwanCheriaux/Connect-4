import { game, GameStatus } from '../src/classes/Game';

describe('Game Class Status', () => {
    it('Should be NEW after starting a new game', () => {
        game.newGame();
        const status = game.getStatus();
        expect(status).toBe(GameStatus.NEW);
    });

    it('Should be HOUSE after user first turn', () => {
        game.newGame();
        game.userMove(0);
        const status = game.getStatus();
        expect(status).toBe(GameStatus.HOUSE);
    });

    it('Should be USER after house first turn', () => {
        game.newGame();
        game.houseMove();
        const status = game.getStatus();
        expect(status).toBe(GameStatus.USER);
    });
});

describe('Game Class Board', () => {
    it('Should be empty after starting a new game', () => {
        game.newGame();
        const board = game.printBoard();

        expect(board).toBe(
            '| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n',
        );
    });

    it('Should contain a USER token on the bottom row after user first turn', () => {
        game.newGame();
        game.userMove(0);
        const board = game.printBoard();

        expect(board).toBe(
            '| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n|X| | | | | | |\n',
        );
    });

    it('Should contain a HOUSE token on the bottom row after house first turn', () => {
        game.newGame();
        game.houseMove();
        const board = game.printBoard();

        const expectedStates = [
            `| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n|O| | | | | | |\n`,
            `| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| |O| | | | | |\n`,
            `| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | |O| | | | |\n`,
            `| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | |O| | | |\n`,
            `| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | |O| | |\n`,
            `| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | |O| |\n`,
            `| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | | |\n| | | | | | |O|\n`,
        ];

        const regex = new RegExp(expectedStates.join('|'));

        expect(board).toMatch(regex);
    });
});
