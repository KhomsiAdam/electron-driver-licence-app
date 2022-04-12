import express from 'express';

import * as auth from '../entities/auth/controller';
import * as admins from '../entities/admin/controller';
import * as users from '../entities/user/controller';
import * as quiz from '../entities/quiz/controller';

import { isAuthenticated, isAdmin } from '../services/auth.service';

export const router = express.Router();

/* Public routes */
// Authentication endpoints
router.post('/login', auth.login);
router.post('/register', auth.register);
router.post('/refresh', auth.refresh);
router.post('/logout', auth.logout);
/* Admin routes */
// User endpoints
router.get('/users', isAuthenticated, users.getAll);
router.get('/users/:id', isAuthenticated, users.getOne);
router.patch('/users/:id', isAuthenticated, users.update);
router.delete('/users/:id', isAdmin, users.remove);
// Admin enpoints
router.get('/admins', isAdmin, admins.getAll);
router.get('/admins/:id', isAdmin, admins.getOne);
router.patch('/admins/:id', isAdmin, users.update);
router.delete('/admins/:id', isAdmin, admins.remove);
// Quiz endpoints
router.post('/quiz', quiz.create);
router.get('/quiz', quiz.getAll);
router.get('/quiz/:id', quiz.getOne);
router.patch('/quiz/:id', quiz.update);
router.delete('/quiz/:id', quiz.remove);

export default router;