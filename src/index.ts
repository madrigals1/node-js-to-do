import express, { Express, Request, Response } from 'express';
import mongoose, { CallbackError, Connection, mongo } from 'mongoose';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT as string, 10) : 4200;

mongoose.connect('mongodb://mongoDataBase:27017/toDoList', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => {console.log('db connected')})
.catch(() => {console.log('error in db connection!')})

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req: Request, res: Response) => {
    res.send('<h1 style="text-align:center;">API started correctly⚡</h1>');
  });

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

