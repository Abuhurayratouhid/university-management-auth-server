import express from 'express';
import usersRoutes from '../modules/users/users.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: usersRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

// router.use('/user', usersRoutes);
// router.use('/academic-semesters', AcademicSemesterRoutes);

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
