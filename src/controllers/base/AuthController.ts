import UserModel from '@models/base/User';
import IController from '@interfaces/eva/ControllerInterface';
import express, { Router } from 'express'
import bcrypt from 'bcrypt'
import { IUser, IUserModel } from '@interfaces/base/UserInterface';
import { ITokenObject } from '@interfaces/eva/TokenObjectInterface';
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
    this._router.post(`${this._path}/register`, this.registerUser);
    this._router.post(`${this._path}/login`, this.loginUser);
    this._router.post(`${this._path}/logout`, this.logoutUser);
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
      this.sendResponseWithToken(createdUser, 200, resp);
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
          this.sendResponseWithToken(existedUser, 200, resp);
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

  private logoutUser = async (req: express.Request, resp: express.Response): Promise<void> => {
    try {
      resp.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
      resp.send(200);
    }
    catch (e) {

    }
  }

  private sendResponseWithToken(user: IUser & IUserModel, status: number, resp: express.Response) {
    const token: ITokenObject = user.getAuthToken(user._id);
    const createCookie = `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn}`;
    user.password = '';
    resp.setHeader('Set-Cookie', [createCookie]);
    resp.status(status).send(user);
  }
}

export default AuthController;