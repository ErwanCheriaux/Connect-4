import { Request, Response, Router } from 'express';
import { GameStatus, game } from '../classes/Game';

const router = Router();

router.post('/open', (req: Request, res: Response) => {
    try {
        if (game.getStatus() === GameStatus.WIN) {
            res.status(200).json('Congratulation, you won the game. The door is now opened.');
        } else {
            res.status(403).json('The door is closed.');
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});

export { router };
