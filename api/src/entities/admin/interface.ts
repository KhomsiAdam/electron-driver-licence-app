import { Schema } from 'mongoose';

export interface Admin {
  email: string;
  password: string;
  role: Schema.Types.ObjectId;
}
