import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import articlesRoutes from './routes/articlesRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('trust proxy', 1);
app.use(
  cors({
    origin: 'https://devforge-frontend-steel.vercel.app',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(logger);

app.use(authRoutes);
app.use(userRoutes);
app.use(articlesRoutes);

app.use(notFoundHandler);

app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Backend run on Port : ${PORT}`);
});
