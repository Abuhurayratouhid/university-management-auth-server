import { IGenericErrorMessage } from './errorInterfaces';

export type IGenericErrorResponse = {
  statusCode: number | string;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
