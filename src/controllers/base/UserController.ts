import UserModel from '@models/base/User';
import { IUser } from '@interfaces/base/UserInterface'
import IController from '@interfaces/eva/ControllerInterface';
import express, { Router } from 'express'
import authHandler from '@middleware/BaseAuthHandler';

class UserController implements IController {
  private _path: string = '/api/users';
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
    this._router.get(`${this._path}`, this.getUsers);
    this._router.get(`${this._path}/:id`, this.getUserById);
    this._router
    .all(`${this._path}/*`, authHandler)
    .patch(`${this._path}/:id`, this.updateUser)
    .delete(`${this._path}/:id`, this.deleteUser)
    .post(`${this._path}`, this.createUser);
  }

  public getUsers = async (req: express.Request, resp: express.Response): Promise<void> => {
    try {
      const users = await this._model.find().exec();
      resp.status(200).send(users);
    }
    catch(e) {
      console.log(e);
      resp.status(500).send('An error occurred while getting users');
    }
  }

  public getUserById = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    try {
      const user = await this._model.findById(id);
      resp.status(200).send(user);
    }
    catch(e) {
      console.log(e);
      resp.status(500).send(`An error occurred while getting user ${id}`);
    }
  }

  public createUser = async (req: express.Request, resp: express.Response): Promise<void> => {
    const data: IUser = req.body;
    try {
      const createdUser = await this._model.create(data);
      resp.status(200).send({
        message: "Success",
        user: createdUser
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send('An error occurred while creating user');
    }
  }

  public deleteUser = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    try {
      const user = await this._model.findByIdAndDelete(id);
      resp.status(200).send({
        message: "Successfull delete"
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send(`An error occurred while deleting user ${id}`);
    }
  }

  public updateUser = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    const data: IUser = req.body;
    try {
      const user = await this._model.findByIdAndUpdate(id, data);
      resp.status(200).send({
        message: "Successfull updated"
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send(`An error occurred while updating user ${id}`);
    }
  }
}

export default UserController;