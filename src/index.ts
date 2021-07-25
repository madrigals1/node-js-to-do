import express, { Express, Request, Response } from 'express';
import mongoose, { CallbackError, Connection, mongo } from 'mongoose';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './router/route';
import { middlewarePrepareException } from './middlewares/error-middleware';

dotenv.config();

const PORT: number = Number(process.env.PORT);

mongoose.connect('mongodb://mongoDataBase:27017/toDoList', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => {console.log('db connected')})
.catch(() => {console.log('error in db connection!')});

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(middlewarePrepareException);



app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

