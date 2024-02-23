import { Request, Response, Router } from 'express';
import { game } from '../classes/Game';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    try {
        const board = game.printBoard();
        res.status(200).json(board);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});

export { router };
