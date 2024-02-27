import { game, GameStatus } from '../src/classes/Game';

describe('Game Class Status', () => {
    it('Should be NEW after starting a new game', () => {
        game.newGame();
        const currentStatus = game.getStatus();
        expect(currentStatus).toBe(GameStatus.NEW);
    });

    it('Should be USER after starting a new game and house first turn', () => {
        game.newGame();
        game.houseMove();
        const currentStatus = game.getStatus();
        expect(currentStatus).toBe(GameStatus.USER);
    });

    it('Should be HOUSE after starting a new game and user first turn', () => {
        game.newGame();
        game.userMove(0);
        const currentStatus = game.getStatus();
        expect(currentStatus).toBe(GameStatus.HOUSE);
    });
});
