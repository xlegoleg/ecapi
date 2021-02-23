import { NextFunction, Request, Response } from 'express';
import BaseException from '../common/exceptions/BaseException';
 
function baseErrorHandler(error: BaseException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'That was an error!';
  response
    .status(status)
    .send({
      status,
      message,
    })
}
 
export default baseErrorHandler;