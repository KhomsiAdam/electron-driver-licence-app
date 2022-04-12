import Joi from 'joi';

export const createQuizSchema = Joi.object({
  category: Joi.string().valid('A', 'B', 'C', 'D').required(),
  type: Joi.string().valid('single', 'multiple').required(),
  question: Joi.string().trim().required(),
  correctAnswer: Joi.string().trim().required(),
  incorrectAnswers: Joi.array().items(Joi.string().trim()).required(),
});

export const updateQuizSchema = Joi.object({
  category: Joi.string().valid('A', 'B', 'C', 'D'),
  type: Joi.string().valid('single', 'multiple'),
  question: Joi.string().trim(),
  correctAnswer: Joi.string().trim(),
  incorrectAnswers: Joi.array().items(Joi.string().trim()),
});
