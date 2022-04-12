import { Schema, model } from 'mongoose';
import { {{capitalizedName}} } from './interface';

const {{capitalizedName}}Schema = new Schema<{{capitalizedName}}>(
  {
  },
  { timestamps: true }
);

export const {{capitalizedName}}Model = model<{{capitalizedName}}>('{{capitalizedName}}', {{capitalizedName}}Schema);
