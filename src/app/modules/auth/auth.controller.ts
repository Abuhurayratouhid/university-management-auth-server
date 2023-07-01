import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  res.send('got value');
});

export const AuthController = {
  loginUser,
};
