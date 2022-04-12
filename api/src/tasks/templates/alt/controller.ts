import { NextFunction, Request, Response } from 'express';
import * as controller from 'services/crud.service';

import { {{capitalizedName}}Model } from './model';
import { {{lowercaseName}}Schema } from './validation';
import { ErrorMessages, SuccessMessages } from './constants';

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  controller.getAll(
    _req,
    res,
    next,
    {{capitalizedName}}Model,
    ErrorMessages.{{uppercaseName}}S_NOT_FOUND,
    false
  );
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  controller.getOne(
    req,
    res,
    next,
    {{capitalizedName}}Model,
    ErrorMessages.{{uppercaseName}}_NOT_FOUND,
    false
  );
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = {{lowercaseName}}Schema.validate(req.body);
  if (!result.error) {
    controller.updateUser(
      req,
      res,
      next,
      {{capitalizedName}}Model,
      SuccessMessages.{{uppercaseName}}_UPDATED,
      ErrorMessages.{{uppercaseName}}_NOT_FOUND
      );
  } else {
    res.status(422);
    log.error(result.error);
    next(result.error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  controller.removeUser(
    req,
    res,
    next,
    {{capitalizedName}}Model,
    SuccessMessages.{{uppercaseName}}_DELETED,
    ErrorMessages.{{uppercaseName}}_NOT_FOUND
  );
};
