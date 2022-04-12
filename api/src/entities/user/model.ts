import { Schema, model } from 'mongoose';
import { User } from './interface';

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    CIN: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 30,
      max: 40,
    },
  },
  { timestamps: true }
);

export const UserModel = model<User>('User', UserSchema);
