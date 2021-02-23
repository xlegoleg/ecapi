import UserModel from '@models/base/User';
import IController from '@interfaces/eva/ControllerInterface';
import express, { Router } from 'express'
import bcrypt from 'bcrypt'
import { IUser } from '@interfaces/base/UserInterface';
import BaseException from '@common/exceptions/BaseException';
import BaseMessage from '@common/messages/BaseMessage';

class AuthController implements IController {
  private _path: string = '/api/auth';
  private _router: Router = express.Router();
  private _model = UserModel;

  constructor() {
    this.initRoutes();
  }

  public path(): string {
    return this._path;
  }

  public router(): Router {
    return this._router;
  }

  private initRoutes(): void {
    this._router.get(`${this._path}/register`, this.registerUser);
    this._router.get(`${this._path}/login`, this.loginUser);
  }

  private registerUser = async (req: express.Request, resp: express.Response): Promise<void> => {
    try {
      const userData: IUser = req.body || {};
      const { email } = userData;
      const existedUser = await this._model.findOne({ email: email });
      if (existedUser) {
        new BaseException(422, `User with ${email} is already exist`);
      }
      const createdUser = await this._model.create(userData);
      createdUser.password = '';
      const msg = new BaseMessage(200, {
        message: 'User sucessful created',
        data: createdUser,
      }, resp);
      msg.send();
    }
    catch (e) {
      new BaseException(500, `An error occured in user registration`);
    }
  }

  private loginUser = async (req: express.Request, resp: express.Response): Promise<void> => {
    try {
      const userData: IUser = req.body || {}
      const { email, password } = userData;
      const existedUser = await this._model.findOne({ email: email });
      if (existedUser) {
        const confirmedPass: boolean = await bcrypt.compare(password, existedUser.password);
        if (confirmedPass) {
          existedUser.password = '';
          const msg = new BaseMessage(200, {
            message: 'User sucessful logged in',
            data: existedUser
          }, resp);
          msg.send();
        } else {
          new BaseException(422, `Password for ${email} is not match`);
        }
      } else {
        new BaseException(404, `User with ${email} not found`);
      }
    }
    catch (e) {

    }
  }
}

export default AuthController;