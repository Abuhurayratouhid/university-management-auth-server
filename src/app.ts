import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
// import { generateFacultyId } from './app/modules/users/users.utils';

const app: Application = express();

// middleware
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
// app.use('/api/v1/user/', usersRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);
app.use('/api/v1', routes);

// testing route
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello ✔ World!');
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

// const testId = async () => {
//   const testResult = await generateFacultyId();
//   console.log(testResult);
// };

// testId();

export default app;
