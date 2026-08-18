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
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
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
