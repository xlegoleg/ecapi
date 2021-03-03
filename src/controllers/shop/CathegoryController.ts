import CathegoryModel from '@models/shop/Cathegory';
import ICathegory from '@interfaces/shop/CathegoryInterface';
import IController from '@interfaces/eva/ControllerInterface';
import IQueryOptions from '@interfaces/eva/QueryOptionsInterface';
import express, { Router } from 'express';
import authHandler from '@middleware/BaseAuthHandler';

class CathegoryController implements IController {
  private _path: string = '/api/cathegories';
  private _router: Router = express.Router();
  private _model = CathegoryModel;

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
    this._router.get(`${this._path}`, this.getCathegories);
    this._router.get(`${this._path}/:id`, this.getCathegoryById);
    this._router
    .all(`${this._path}/*`, authHandler)
    .patch(`${this._path}/:id`, this.updateCathegory)
    .delete(`${this._path}/:id`, this.deleteCathegory)
    .post(`${this._path}/create`, this.createCathegory);
  }

  public getCathegories = async (req: express.Request, resp: express.Response): Promise<void> => {
    const queryOptions: IQueryOptions = {
      page: parseInt(String(req.query?.page)) || 1,
      perPage: parseInt(String(req.query?.perPage)) || 10
    }
    try {
      const cathegories = await this._model.find()
                        .skip((queryOptions.page - 1)*queryOptions.perPage)
                        .limit(queryOptions.perPage).exec();
      resp.status(200).send(cathegories);
    }
    catch(e) {
      console.log(e);
      resp.status(500).send('An error occurred while getting cathegories');
    }
  }

  public getCathegoryById = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    try {
      const cathegory = await this._model.findById(id);
      resp.status(200).send(cathegory);
    }
    catch(e) {
      console.log(e);
      resp.status(500).send(`An error occurred while getting cathegory ${id}`);
    }
  }

  public createCathegory = async (req: express.Request, resp: express.Response): Promise<void> => {
    const data: ICathegory = req.body;
    try {
      const createdCathegory = await this._model.create(data);
      resp.status(200).send({
        message: "Success",
        cathegory: createdCathegory
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send('An error occurred while creating cathegory');
    }
  }

  public deleteCathegory = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    try {
      const cathegory = await this._model.findByIdAndDelete(id);
      resp.status(200).send({
        message: "Successfull delete"
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send(`An error occurred while deleting cathegory ${id}`);
    }
  }

  public updateCathegory = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    const data: ICathegory = req.body;
    try {
      const cathegory = await this._model.findByIdAndUpdate(id, data);
      resp.status(200).send({
        message: "Successfull updated"
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send(`An error occurred while updating cathegory ${id}`);
    }
  }
}

export default CathegoryController;