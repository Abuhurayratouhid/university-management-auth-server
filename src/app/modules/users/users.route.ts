import express from 'express';
import usersController from './users.controller';
import { UserValidation } from './users.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  usersController.createStudent
);

export default router;
