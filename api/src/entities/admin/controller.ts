import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { AdminModel } from './model';
import { AuthModel } from '../auth/model';
import { AdminSchema } from './validation';

import { ErrorMessages } from './constants';
import { log } from '../../services/logger.service';

// Get all admins (without passwords)
export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminModel.find().select('-password');
    if (result && result.length > 0) {
      res.json(result);
    } else {
      res.json({ message: ErrorMessages.ADMIN_NOT_FOUND });
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
    const user = await AdminModel.findOne(query).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.json({ message: ErrorMessages.ADMIN_NOT_FOUND });
    }
  } catch (error) {
    next(error);
  }
};

// Update user
export const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id: _id } = req.params;
  try {
    const result = AdminSchema.validate(req.body);
    if (!result.error) {
      const query = { _id };
      const user = await AdminModel.findOne(query);
      if (user) {
        const updatedUser = req.body;
        if (updatedUser.password) {
          updatedUser.password = await bcrypt.hash(updatedUser.password, 12);
        }
        const response = await AdminModel.findOneAndUpdate(
          query,
          {
            $set: updatedUser,
          },
          { new: true }
        ).select('-password');
        if (response) {
          await AuthModel.updateOne({ email: user.email }, { email: response.email });
          res.json(response);
        }
      } else {
        next({ message: ErrorMessages.ADMIN_NOT_FOUND });
      }
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
    const user = await AdminModel.findOne(query);
    if (user) {
      const response = await AdminModel.findOneAndDelete(query);
      if (response) {
        await AuthModel.deleteOne({ email: response.email });
        res.json(response);
      }
    } else {
      next({ message: ErrorMessages.ADMIN_NOT_FOUND });
    }
  } catch (error) {
    next(error);
  }
};
