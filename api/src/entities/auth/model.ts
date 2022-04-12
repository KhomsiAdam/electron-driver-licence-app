import { Schema, model } from 'mongoose';
import { Auth } from './interface';

const AuthSchema = new Schema<Auth>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    refreshToken: [
      {
        type: String,
        default: [],
      },
    ],
  },
  { timestamps: true },
);

export const AuthModel = model<Auth>('Auth', AuthSchema);
