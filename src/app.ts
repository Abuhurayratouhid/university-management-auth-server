import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();

// middleware
app.use(cors());

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

export default app;
