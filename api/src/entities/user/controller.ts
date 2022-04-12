import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { UserModel } from './model';
import { userSchema } from './validation';

import { SuccessMessages, ErrorMessages } from './constants';
import { log } from '../../services/logger.service';

// Get all users (without passwords)
export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserModel.find();
    if (result && result.length > 0) {
      res.json(result);
    } else {
      res.json({ message: ErrorMessages.USERS_NOT_FOUND });
    }
  } catch (error) {
    next(error);
  }
};

// Get user by id (without password)
export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  const { id: _id } = req.params;
  try {
    const query = { _id };
    const user = await UserModel.findOne(query);
    if (user) {
      res.json(user);
    } else {
      res.json({ message: ErrorMessages.USER_NOT_FOUND });
    }
  } catch (error) {
    next(error);
  }
};

// Update user
export const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id: _id } = req.params;
  try {
    const result = userSchema.validate(req.body);
    if (!result.error) {
      const query = { _id };
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
      }
      const response = await UserModel.findOneAndUpdate(query, { $set: req.body }, { new: true });
      res.json({ response, message: SuccessMessages.USER_UPDATED });
    } else {
      res.status(422);
      log.error(result.error);
      next(result.error);
    }
  } catch (error) {
    next(error);
  }
};

// Delete user by id
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { id: _id } = req.params;
  try {
    const query = { _id };
    const response = await UserModel.findOneAndDelete(query);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
