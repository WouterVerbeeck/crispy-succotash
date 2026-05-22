import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(connectionString);
};
