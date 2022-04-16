import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { findUser, generateAccessToken, generateRefreshToken, sendRefreshToken } from '../../services/auth.service';
import { catchErrors } from 'helpers';

import { AuthModel } from './model';
import { UserModel } from '../user/model';
import { loginSchema, registerSchema } from './validation';
import { FetchedUser } from './interface';
import { SuccessMessages, ErrorMessages } from './constants';

// Register logic
export const register = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  // Register validation
  const { error } = registerSchema.validate(req.body);
  if (error) {
    if (error.details[0].type === 'any.required') {
      res.status(400);
      return next(new Error(ErrorMessages.REQUIRED_FIELDS_MISSING));
    } else {
      res.status(422);
      return next(error);
    }
  }
  // Find user
  const response = await findUser(req);
  if (!response) {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.json({ message: SuccessMessages.REGISTER_SUCCESS });
  } else {
    res.status(409);
    next(new Error(ErrorMessages.REGISTER_ERROR));
  }
});

// Login logic
export const login = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  // Login validation  
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(422);
    return next(error);
  } // Find user
  const foundUser = await findUser(req);
  // Compare passwords
  if (foundUser) {
    const result = await bcrypt.compare(req.body.password, foundUser.password);
    if (result) {
      // Set refresh token in cookie
      sendRefreshToken(res, generateRefreshToken(foundUser._id, foundUser.role));
      // Send access token
      res.json({
        token: generateAccessToken(foundUser._id, foundUser.role),
        role: [foundUser.role],
        message: SuccessMessages.LOGGED_IN,
      });

    } else {
      res.status(422);
      next(new Error(ErrorMessages.LOGIN_ERROR));
    }
  } else {
    res.status(422);
    next(new Error(ErrorMessages.LOGIN_ERROR));
  }
});

// Refresh access token
//@ts-ignore
export const refresh = async (req: Request, res: Response) => {
  // Get refresh token from cookie
  const refreshToken = req?.cookies?.rtkn;
  if (!refreshToken) return res.json({ message: SuccessMessages.NOT_LOGGED_IN });
  // Clear refresh token from cookie

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string, async (err: any, decoded: any) => {
    if (err) {
      return res.json({ message:'Expired refresh token' });
    }
    const foundUser = (await mongoose.model(decoded.role).findOne({ _id: decoded._id })) as FetchedUser;

    // Refresh token was still valid
    const accessToken = generateAccessToken(foundUser._id, decoded.role);
    const newRefreshToken = generateRefreshToken(foundUser._id, decoded.role);
    res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
    return res.json({ token: accessToken, role: [decoded.role] });
  });
};

// Logout user, reset refresh token
export const logout = async (req: Request, res: Response) => {
  const refreshToken = req?.cookies?.rtkn;
  if (!refreshToken) return res.json({ message: SuccessMessages.NOT_LOGGED_IN });
  // Check if user have any refresh token in database
  const foundUser = (await AuthModel.findOne({ refreshToken })) as FetchedUser;
  if (!foundUser) {
    res.clearCookie('rtkn', { httpOnly: true, sameSite: 'none', secure: true });
    return res.json({ message: SuccessMessages.LOGGED_OUT });
  } else {
    // Delete refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter((rt: string) => rt !== refreshToken);
    await foundUser.save();
    res.clearCookie('rtkn', { httpOnly: true, sameSite: 'none', secure: true });
    return res.json({ message: SuccessMessages.LOGGED_OUT });
  }
};
