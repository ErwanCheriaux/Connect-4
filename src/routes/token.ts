import { Request, Response, Router } from 'express';

const router = Router();

router.put('/user/:row([1-7])', (req: Request, res: Response) => {
    try {
        res.status(200).json('put a token in the given row and return the board');
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
