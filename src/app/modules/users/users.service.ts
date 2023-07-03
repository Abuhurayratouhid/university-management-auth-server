import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemesterModel';
import { IStudent } from '../student/student.interface';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateStudentId } from './users.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // const academicSemester = {
  //   code: '01',
  //   year: '2023',
  // };
  // const id = await generateStudentId(academicSemester);

  // user.id = id;
  //if password not given default password will be automatic set
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // hash password
  // user.password = await bcrypt.hash(
  //   user.password,
  //   Number(config.bcrypt_salt_rounds)
  // );
  //set role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  let newUserAllData = null;
  // start a session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //generate student id
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // set student _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
      ],
    });
  }

  return newUserAllData;
};

export default {
  createStudent,
};
