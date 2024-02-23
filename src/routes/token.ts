import { Request, Response, Router } from 'express';
import { game } from '../classes/Game';

const router = Router();

router.put('/user/:col([1-7])', (req: Request, res: Response) => {
    try {
        const column: number = parseInt(req.params.col);
        game.userMove(column - 1);
        const board = game.printBoard();
        res.status(200).json(board);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});

router.put('/house', (req: Request, res: Response) => {
    try {
        res.status(200).json('make the house play and return the board');
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});

export { router };
