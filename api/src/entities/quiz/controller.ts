import { Request, Response, NextFunction } from 'express';
import * as controller from 'services/crud.service';

import { QuizModel } from './model';
import { createQuizSchema, updateQuizSchema } from './validation';
import { ErrorMessages, SuccessMessages } from './constants';
import { catchErrors } from 'helpers';

export const create = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.create(req, res, next, createQuizSchema, QuizModel, SuccessMessages.QUIZ_CREATED);
});

export const getAll = catchErrors(async (_req: Request, res: Response, next: NextFunction) => {
  controller.getAll(_req, res, next, QuizModel, ErrorMessages.QUIZS_NOT_FOUND, false);
});

export const getOne = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.getOne(req, res, next, QuizModel, ErrorMessages.QUIZ_NOT_FOUND, false);
});

export const update = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.update(
    req,
    res,
    next,
    updateQuizSchema,
    QuizModel,
    SuccessMessages.QUIZ_UPDATED,
    ErrorMessages.QUIZ_NOT_FOUND,
  );
});

export const remove = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.remove(req, res, next, QuizModel, SuccessMessages.QUIZ_DELETED, ErrorMessages.QUIZ_NOT_FOUND);
});
