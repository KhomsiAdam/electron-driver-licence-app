import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  firstname: Joi.string().trim(),
  lastname: Joi.string().trim(),
  birthdate: Joi.date().required(),
  CIN: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
  score: Joi.number().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .trim()
    .required(),
  password: Joi.string().trim().min(10).required(),
});