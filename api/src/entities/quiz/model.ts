import { Schema, model } from 'mongoose';
import { Quiz } from './interface';

const QuizSchema = new Schema<Quiz>(
  {
    category: {
      type: String,
      enum: ['A', 'B', 'C', 'D'],
      required: true,
    },
    type: {
      type: String,
      enum: ['single', 'multiple'],
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    incorrectAnswers: [{
      type: String,
      required: true,
    }],
  },
  { timestamps: true },
);

export const QuizModel = model<Quiz>('Quiz', QuizSchema);
