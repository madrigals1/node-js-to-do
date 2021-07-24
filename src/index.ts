import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT as string, 10) : 4200;
const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>API IS WORKING</h1>');
  });

  app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));