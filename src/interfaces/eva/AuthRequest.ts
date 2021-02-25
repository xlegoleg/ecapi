import { Request } from 'express';
import { IUser } from '@interfaces/base/UserInterface';

export interface IAuthRequest extends Request {
  user?: IUser
}