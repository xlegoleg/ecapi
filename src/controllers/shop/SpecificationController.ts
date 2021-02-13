import SpecificationModel from '@models/shop/Specification';
import ISpecification from '@interfaces/shop/SpecificationInterface';
import IController from '@interfaces/eva/ControllerInterface';
import express, { Router } from 'express';

class SpecificationController implements IController {
  private _path: String = '/api/specifications';
  private _router: Router = express.Router();
  private _model = SpecificationModel;

  constructor() {
    this.initRoutes();
  }

  public path(): String {
    return this._path;
  }

  public router(): Router {
    return this._router;
  }

  private initRoutes(): void {
    this._router.get(`${this._path}`, this.getSpecifications);
    this._router.get(`${this._path}/:id`, this.getSpecificationById);
    this._router.patch(`${this._path}/:id`, this.updateSpecification);
    this._router.delete(`${this._path}/:id`, this.deleteSpecification);
    this._router.post(`${this._path}`, this.createSpecification);
  }

  public getSpecifications = async (req: express.Request, resp: express.Response): Promise<void> => {
    try {
      const specifications = await this._model.find().exec();
      resp.status(200).send(specifications);
    }
    catch(e) {
      console.log(e);
      resp.status(500).send('An error occurred while getting specifications');
    }
  }

  public getSpecificationById = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    try {
      const specification = await this._model.findById(id);
      resp.status(200).send(specification);
    }
    catch(e) {
      console.log(e);
      resp.status(500).send(`An error occurred while getting specification ${id}`);
    }
  }

  public createSpecification = async (req: express.Request, resp: express.Response): Promise<void> => {
    const data: ISpecification = req.body;
    try {
      const createdSpecification = await this._model.create(data);
      resp.status(200).send({
        message: "Success",
        specification: createdSpecification
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send('An error occurred while creating specification');
    }
  }

  public deleteSpecification = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    try {
      const specification = await this._model.findByIdAndDelete(id);
      resp.status(200).send({
        message: "Successfull delete"
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send(`An error occurred while deleting specification ${id}`);
    }
  }

  public updateSpecification = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    const data: ISpecification = req.body;
    try {
      const specification = await this._model.findByIdAndUpdate(id, data);
      resp.status(200).send({
        message: "Successfull updated"
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send(`An error occurred while updating specification ${id}`);
    }
  }
}

export default SpecificationController;