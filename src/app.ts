import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import usersRoutes from './app/modules/users/users.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
const app: Application = express();

// middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use('/api/v1/user/', usersRoutes);
app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

// testing route
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello ✔ World!');
});

app.use(globalErrorHandler);

export default app;
