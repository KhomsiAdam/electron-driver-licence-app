import 'dotenv/config';
import mongoose from 'mongoose';
import { log } from '../services/logger.service';

import { QuizModel } from '../entities/quiz/model';
import quiz from './quiz.json';

const { DB_URI } = process.env;

const seedQuiz = async () => {
  mongoose.connect(DB_URI as string, async () => {
    try {
      await QuizModel.collection.drop();
      const trucks = await QuizModel.create(quiz);
      if (trucks) {
        log.info('Quizzes created!');
        mongoose.disconnect();
      }
    } catch (error) {
      log.error(error);
      mongoose.disconnect();
    }
  });
};

seedQuiz();