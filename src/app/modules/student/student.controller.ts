import { Request, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

import { IStudent } from './student.interface';
import { studentFilterableFields } from './student.constant';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: req.query.sortBy,
  //   sortOrder: req.query.sortOrder,
  // };
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  // console.log(filters);
  // console.log(paginationOptions);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );
  sendResponse<IStudent[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
  // next();
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.getSingleStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: status.OK,
    success: true,
    message: '[byId] Student retrieved successfully',
    data: result,
  });
  // next();
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await StudentService.updateStudent(id, updatedData);

  sendResponse<IStudent>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
  // next();
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
  // next();
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
