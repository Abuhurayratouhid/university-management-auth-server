import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateStudentId } from './users.utils';
// import { generateUserId } from './users.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const academicSemester = {
    code: '01',
    year: '2023',
  };
  const id = await generateStudentId(academicSemester);

  user.id = id;
  //if password not given default password will be automatic set
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const createdUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(400, 'Failed to create user');
  }

  return createdUser;
};

export default {
  createUser,
};
