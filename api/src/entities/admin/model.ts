import { Schema, model } from 'mongoose';
import { Admin } from './interface';

const AdminSchema = new Schema<Admin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
    },
  },
  { timestamps: true }
);

export const AdminModel = model<Admin>('Admin', AdminSchema);
