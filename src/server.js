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
const allowedOrigins = [
  'http://localhost:3000',
  'https://devforge-frontend-steel.vercel.app',
];
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Required because your frontend sends cookies/credentials
  }),
);
app.use(logger);
app.use(cookieParser());

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
