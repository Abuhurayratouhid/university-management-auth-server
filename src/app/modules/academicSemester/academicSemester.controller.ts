import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;

    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    // res.status(200).json({
    //   success: true,
    //   message: 'Semester created successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Semester created successfully',
      data: result,
    });
    next();
  }
);

export const AcademicSemesterController = {
  createSemester,
};
