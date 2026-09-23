import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { errors } from 'celebrate';
import { connectDatabase } from './db/prisma.js';
import authRoute from './routes/authRoute.js';
import productsRoute from './routes/productsRoute.js';
import userRoute from './routes/userRoute.js';
import locationsRoute from './routes/locationsRoute.js';
import cartRouter from './routes/cartRoute.js';
import ordersRouter from './routes/ordersRoute.js';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3001'],
    credentials: true,
  }),
);

app.use(
  pinoHttp({
      level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.use(helmet());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/products', productsRoute);
app.use('/api/user', userRoute);
app.use('/api/locations', locationsRoute);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

await connectDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
