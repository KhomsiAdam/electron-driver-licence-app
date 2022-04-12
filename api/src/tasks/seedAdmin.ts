import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { log } from '../services/logger.service';

import { AdminModel } from '../entities/admin/model';
import { AuthModel } from '../entities/auth/model';

const { DB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

const seedAdmin = () => {
  mongoose.connect(DB_URI as string, async () => {
    try {
      const admin = await AdminModel.findOne({ email: ADMIN_EMAIL });
      if (!admin) {
        const hashed = await bcrypt.hash(ADMIN_PASSWORD as string, 12);
        const admin = new AdminModel({
          email: ADMIN_EMAIL,
          password: hashed,
        });
        await admin.save();
        const registeredAdmin = new AuthModel({
          email: ADMIN_EMAIL,
          role: AdminModel.modelName,
        });
        await registeredAdmin.save();
        log.info('Admin created!');
        mongoose.disconnect();
      } else {
        log.info('Admin already exists!');
        mongoose.disconnect();
      }
    } catch (error) {
      log.error(error);
      mongoose.disconnect();
    }
  });
};

seedAdmin();
