import { Request, Response, Router } from 'express';
import { game } from '../classes/Game';

const router = Router();

router.post('/', (req: Request, res: Response) => {
    try {
        game.newGame();
        const board = game.printBoard();
        res.status(200).send(board);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});

export { router };
