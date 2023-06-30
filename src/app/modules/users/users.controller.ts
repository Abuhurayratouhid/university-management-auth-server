import { Request, Response } from 'express';
import usersService from './users.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await usersService.createUser(userData);
  // res.status(200).json({
  //   success: true,
  //   message: 'User created successfully',
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
  // next();
});

export default {
  createUser,
};
