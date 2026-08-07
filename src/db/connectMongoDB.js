import mongoose from 'mongoose';
import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);

export const connectMongoDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    await mongoose.connect(url);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed: ', error.message);
    process.exit(1);
  }
};
