import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// Install middleware
app.use(morgan('tiny'));

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
