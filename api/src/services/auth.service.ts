import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { AuthModel } from 'entities/auth/model';
import { FetchedUser } from 'entities/auth/interface';

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_EXPIRATION, JWT_REFRESH_EXPIRATION, REFRESH_TOKEN_ENDPOINT } =
  process.env;

// Access Token generation when login
export const generateAccessToken = (id: mongoose.Schema.Types.ObjectId, userRole: string) => {
  const payload = {
    _id: id,
    role: userRole,
  };
  return jwt.sign(payload, JWT_ACCESS_SECRET as string, {
    expiresIn: JWT_ACCESS_EXPIRATION,
  });
};

// Refresh Token generation when login
export const generateRefreshToken = (id: mongoose.Schema.Types.ObjectId, userRole: string) => {
  const payload = {
    _id: id,
    role: userRole,
  };
  return jwt.sign(payload, JWT_REFRESH_SECRET as string, {
    expiresIn: JWT_REFRESH_EXPIRATION,
  });
};

// Send refresh token and set to coookie
export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('rtkn', token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: REFRESH_TOKEN_ENDPOINT,
  });
};

// Unauthorized error
export const unAuthorized = (res: Response, next: NextFunction) => {
  const error = new Error('Unauthorized.');
  res.status(401);
  next(error);
};

// Is authenticated middleware
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return unAuthorized(res, next);
  const token = authHeader?.split(' ')[1];
  if (!token) return unAuthorized(res, next);
  jwt.verify(token!, JWT_ACCESS_SECRET as string, async (error: any, user: any) => {
    if (error) {
      res.status(403);
      next(error);
    }
    req.user = user;
    next();
  });
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return unAuthorized(res, next);
  const token = authHeader?.split(' ')[1];
  if (!token) return unAuthorized(res, next);
  jwt.verify(token!, JWT_ACCESS_SECRET as string, async (error: any, user: any) => {
    if (error) {
      res.status(403);
      next(error);
    }
    if (user) {
      const authorizedUser = await mongoose.model('Admin').findOne({ _id: user._id });
      if (authorizedUser) {
        next();
      } else {
        unAuthorized(res, next);
      }
    }
  });
};

// Finding the existence of a user
export const findUser = async (req: Request) => {
  const fetchedRole = await AuthModel.findOne(
    {
      email: req.body.email,
    },
    'role',
  );
  if (fetchedRole) {
    const user = (await mongoose
      .model(fetchedRole.role)
      .findOne({ email: req.body.email }, 'email password')) as FetchedUser;
    if (user) {
      req.user = fetchedRole;
      return {
        _id: user._id,
        email: user.email,
        password: user.password,
        role: fetchedRole.role,
      };
    } else {
      return false;
    }
  } else {
    return false;
  }
};
