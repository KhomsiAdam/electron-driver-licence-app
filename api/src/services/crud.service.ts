import { NextFunction, Request, Response } from 'express';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
  entitySchema: any,
  Model: any,
  successMessage: string,
) => {
  const { error } = entitySchema.validate(req.body);
  if (error) {
    res.status(422);
    return next(error);
  }
  const document = new Model(req.body);
  await document.save();
  res.json({ message: successMessage });
};

export const getAll = async (
  _req: Request,
  res: Response,
  _next: NextFunction,
  Model: any,
  errorMessage: string,
  populate: boolean = false,
  populateFields: string = '',
) => {
  let elements;
  if (populate) {
    elements = await Model.find().populate(populateFields);
  } else {
    elements = await Model.find();
  }
  if (elements && elements.length > 0) {
    res.json(elements);
  } else {
    res.json({ message: errorMessage });
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  _next: NextFunction,
  Model: any,
  errorMessage: string,
  populate: boolean = false,
  populateFields: string = '',
) => {
  const { id: _id } = req.params;
  const query = { _id };
  let element;
  if (populate) {
    element = await Model.findOne(query).populate(populateFields);
  } else {
    element = await Model.findOne(query);
  }
  if (element) {
    res.json(element);
  } else {
    res.json({ message: errorMessage });
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
  entitySchema: any,
  Model: any,
  successMessage: string,
  errorMessage: string,
) => {
  const { error } = entitySchema.validate(req.body);
  if (error) {
    res.status(422);
    return next(error);
  }
  const { id: _id } = req.params;
  const query = { _id };
  const response = await Model.findOneAndUpdate(
    query,
    {
      $set: req.body,
    },
    { new: true },
  );
  if (response) {
    res.json({ response, message: successMessage });
  } else {
    next({ message: errorMessage });
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
  Model: any,
  successMessage: string,
  errorMessage: string,
) => {
  const { id: _id } = req.params;
  const query = { _id };
  const response = await Model.findOneAndDelete(query);
  if (response) {
    res.json({ response, message: successMessage });
  } else {
    next({ message: errorMessage });
  }
};
