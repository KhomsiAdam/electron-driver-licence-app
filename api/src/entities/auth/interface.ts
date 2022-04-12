import { Schema, Document } from 'mongoose';

export interface Auth {
  email: string;
  role: string;
  refreshToken: Array<string>;
}

export interface FetchedUser extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  role: string;
  password: string;
  refreshToken: Array<string>;
}
