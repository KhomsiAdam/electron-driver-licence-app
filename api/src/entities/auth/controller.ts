import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { findUser, generateAccessToken, generateRefreshToken, sendRefreshToken } from '../../services/auth.service';
// import { log } from '../../services/logger.service';
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
    // Create a user entry with role for login
    // const registeredUser = new AuthModel({
    //   email: req.body.email,
    //   role: UserModel.modelName,
    // });
    // await registeredUser.save();
    // Hash password then create user
    // const hashed = await bcrypt.hash(req.body.password, 12);
    // req.body.password = hashed;
    // req.body.role = registeredUser._id;
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
      // const refreshToken = req?.cookies?.rtkn;
      // Set refresh token in cookie
      sendRefreshToken(res, generateRefreshToken(foundUser._id, foundUser.role));
      // Send access token
      res.json({
        token: generateAccessToken(foundUser._id, foundUser.role),
        role: [foundUser.role],
        message: SuccessMessages.LOGGED_IN,
      });

      // testing
      // let newRefreshTokenArray =
      // !refreshToken
      //   ? req?.user?.refreshToken
      //   : req?.user?.refreshToken.filter((rt: string) => rt !== refreshToken);

      //   if (refreshToken) {
      //     const foundToken = await AuthModel.findOne({ refreshToken });
    
      //     // Detected refresh token reuse!
      //     if (!foundToken) {
      //       console.log('attempted refresh token reuse at login!')
      //       // clear out ALL previous refresh tokens
      //       newRefreshTokenArray = [];
      //     }
    
      //     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      //   }

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
  // res.clearCookie('rtkn', { httpOnly: true, sameSite: 'none', secure: true });

  // const foundUser = (await AuthModel.findOne({ refreshToken })) as FetchedUser;

  // Detected refresh token reuse!
  // if (!foundUser) {
  //   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
  //     if (err) return res.sendStatus(403); //Forbidden
  //     console.log('attempted refresh token reuse!');
  //     const hackedUser = await User.findOne({ username: decoded.username }).exec();
  //     hackedUser.refreshToken = [];
  //     const result = await hackedUser.save();
  //     console.log(result);
  //   });
  //   return res.sendStatus(403); //Forbidden
  // }

  // const newRefreshTokenArray = foundUser.refreshToken.filter((rt: string) => rt !== refreshToken);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string, async (err: any, decoded: any) => {
    if (err) {
      // foundUser.refreshToken = [...newRefreshTokenArray];
      // const result = await foundUser.save();
      // console.log(result);
      return res.json({ message:'Expired refresh token' });
    }
    // if (err || foundUser._id !== decoded._id) return res.sendStatus(403);
    console.log(decoded);
    const foundUser = (await mongoose.model(decoded.role).findOne({ _id: decoded._id })) as FetchedUser;

    // Refresh token was still valid
    // const roles = Object.values(foundUser.role);
    const accessToken = generateAccessToken(foundUser._id, decoded.role);
    const newRefreshToken = generateRefreshToken(foundUser._id, decoded.role);
    // Saving refreshToken with current user
    // foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    // await foundUser.save();
    // // Generate new refresh token
    // sendRefreshToken(res, generateRefreshToken(user._id, payload.role));
    // // Generate new access token
    // const generatedToken = generateAccessToken(user._id, payload.role);
    // Creates Secure Cookie with refresh token
    res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
    return res.json({ token: accessToken, role: [decoded.role] });
  });

  // const token = req.cookies.rtkn;
  // if (!token) return res.json({ message: false });
  // // JWT payload interface
  // interface JWTPayload {
  //   _id: string;
  //   role: string;
  // }
  // // Validate refresh token
  // let payload = null;
  // try {
  //   payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as JWTPayload;
  // } catch (err) {
  //   log.error(err);
  //   return res.json({ message: false });
  // }
  // // Find user by id depending on role
  // const user = (await mongoose.model(payload.role).findOne({ _id: payload._id })) as FetchedUser;
  // if (!user) return res.json({ message: false });
  // // Generate new refresh token
  // sendRefreshToken(res, generateRefreshToken(user._id, payload.role));
  // // Generate new access token
  // const generatedToken = generateAccessToken(user._id, payload.role);
  // return res.json({ token: generatedToken, role: [payload.role] });

  // const cookies = req.cookies;
  // if (!cookies?.jwt) return res.sendStatus(401);
  // const refreshToken = cookies.jwt;


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
    const result = await foundUser.save();
    console.log(result);
    res.clearCookie('rtkn', { httpOnly: true, sameSite: 'none', secure: true });
    return res.json({ message: SuccessMessages.LOGGED_OUT });
  }
};
