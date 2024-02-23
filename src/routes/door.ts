import { Request, Response, Router } from 'express';

const router = Router();

router.post('/open', (req: Request, res: Response) => {
    try {
        res.status(200).json('returns 403 until you win the game');
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});

export { router };
