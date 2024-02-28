import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import { router as gameRoutes } from './routes/game';
import { router as boardRoutes } from './routes/board';
import { router as tokenRoutes } from './routes/token';
import { router as doorRoutes } from './routes/door';

//For env File
if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config();
}

// Enable CORS for a specific origin
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

const app: Application = express();
const port = process.env.PORT || 8000;

// Install middleware
app.use(morgan('tiny'));
app.use(cors(corsOptions));

// Install routes
app.use('/game', gameRoutes);
app.use('/board', boardRoutes);
app.use('/token', tokenRoutes);
app.use('/door', doorRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

const server = app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});

export { app, server };
