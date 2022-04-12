import Joi from 'joi';

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  firstname: Joi.string().trim(),
  lastname: Joi.string().trim(),
  birthdate: Joi.date().required(),
  CIN: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
  score: Joi.number().min(30).max(40).required(),
});