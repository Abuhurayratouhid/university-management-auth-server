import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/users.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  const user = new User();
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create jwt access token & refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

// const refreshToken = async (token: string) => {
//   // let  verifiedToken = null
//   try {
//     const verifiedToken = jwt.verify(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//     console.log(verifiedToken);
//   } catch (error) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }

//   // const user = new User();
//   // const {userId}= verifiedToken

//   // const isUserExist = user.isUserExist(userId)

//   // if(!isUserExist){
//   //   throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exist')
//   // }
// };

const refreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt.refresh_secret as Secret);
    console.log(decoded);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token');
  }
};

export const AuthService = {
  loginUser,
  refreshToken,
};
