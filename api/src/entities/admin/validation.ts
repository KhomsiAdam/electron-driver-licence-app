import Joi from 'joi';

export const AdminSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .trim(),
  password: Joi.string().trim().min(10),
});