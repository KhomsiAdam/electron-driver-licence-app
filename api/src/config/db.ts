import 'dotenv/config';
import { log } from '../services/logger.service';
import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI as string;

export const initializeDatabaseConnection = async () => {
  try {
    await mongoose.connect(DB_URI);
    log.debug(`Connected to database.`);
    // mongoose.connection.on('error', (error) => {
    //   log.error(error);
    // });
  } catch (error) {
    log.error(error);
  }
};
