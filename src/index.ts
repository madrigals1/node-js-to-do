import express, { Express } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

import { router } from './router/route';
import { middlewarePrepareException } from './middlewares/error-middleware';
import * as swaggerDocument from './swagger.json';

dotenv.config();

const PORT = Number(process.env.PORT);
const MONGO_DB_URL = String(process.env.MONGO_DB_URL);

mongoose.connect(MONGO_DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  // eslint-disable-next-line no-console
  .then(() => { console.log('db connected'); })
  // eslint-disable-next-line no-console
  .catch(() => { console.log('error in db connection!'); });

const app: Express = express();
const corsOptions = {
  origin: [
    process.env.CORS_ORIGIN_URL || 'http://localhost:4200',
    'http://localhost:3000',
  ],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', router);
app.use(middlewarePrepareException);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
