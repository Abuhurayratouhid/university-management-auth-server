import { IGenericErrorMessage } from './errorInterfaces';

export type IGenericErrorResponse = {
  statusCode: number | string;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
