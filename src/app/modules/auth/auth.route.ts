import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
// router.get('/', StudentController.getAllStudents);

// router.delete('/:id', StudentController.deleteStudent);
// router.patch(
//   '/:id',
//   validateRequest(StudentValidation.updateStudentZodSchema),
//   StudentController.updateStudent
// );

export const AuthRoutes = router;
