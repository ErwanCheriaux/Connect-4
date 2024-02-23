import { Request, Response, Router } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response) => {
    try {
        res.status(200).json('start a new game, returns an empty board as displayed before');
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});

export { router };
