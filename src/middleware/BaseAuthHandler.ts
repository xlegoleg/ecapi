import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthException from '@common/exceptions/AuthException';
import { IAuthRequest } from '@interfaces/eva/AuthRequest';
import UserModel from '@models/base/User'
import dotenv from 'dotenv';

dotenv.config({
  path: './config/config.env'
})
 
async function authHandler(req: IAuthRequest, resp: Response, next: NextFunction) {
  const auth = req.headers.Auth || '';
  if (auth) {
    const secret = String(process.env.JWT_SECRET);
    try {
      const verificationResponse = jwt.verify(String(auth), secret) as any
      const id = verificationResponse.data;
      const user = await UserModel.findById(id);
      if (user) {
        req.user = user;
        next();
      } else {
        next(new AuthException());
      }
    } catch (error) {
      next(new AuthException());
    }
  } else {
    next(new AuthException());
  }
}
 
export default authHandler;