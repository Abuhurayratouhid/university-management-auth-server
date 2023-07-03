import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academicSemester.constant';
import status from 'http-status';
import ApiError from '../../../errors/ApiError';

const academicSemesterSchema = new Schema<IAcademicSemester>({
  title: {
    type: String,
    required: true,
    enum: academicSemesterTitle,
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: academicSemesterCode,
  },
  startMonth: {
    type: String,
    required: true,
    enum: academicSemesterMonths,
  },
  endMonth: {
    type: String,
    required: true,
    enum: academicSemesterMonths,
  },
});

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semester is already exist');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
