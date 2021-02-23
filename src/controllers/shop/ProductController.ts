import ProductModel from '@models/shop/Product';
import IProduct from '@interfaces/shop/ProductInterface';
import IController from '@interfaces/eva/ControllerInterface';
import express, { Router } from 'express';

class ProductController implements IController {
  private _path: string = '/api/products';
  private _router: Router = express.Router();
  private _model = ProductModel;

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
    this._router.get(`${this._path}`, this.getProducts);
    this._router.get(`${this._path}/:id`, this.getProductById);
    this._router.patch(`${this._path}/:id`, this.updateProduct);
    this._router.delete(`${this._path}/:id`, this.deleteProduct);
    this._router.post(`${this._path}`, this.createProduct);
  }

  public getProducts = async (req: express.Request, resp: express.Response): Promise<void> => {
    try {
      const products = await this._model.find().exec();
      resp.status(200).send(products);
    }
    catch(e) {
      console.log(e);
      resp.status(500).send('An error occurred while getting products');
    }
  }

  public getProductById = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    try {
      const product = await this._model.findById(id);
      resp.status(200).send(product);
    }
    catch(e) {
      console.log(e);
      resp.status(500).send(`An error occurred while getting product ${id}`);
    }
  }

  public createProduct = async (req: express.Request, resp: express.Response): Promise<void> => {
    const data: IProduct = req.body;
    try {
      const createdProduct = await this._model.create(data);
      resp.status(200).send({
        message: "Success",
        product: createdProduct
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send('An error occurred while creating product');
    }
  }

  public deleteProduct = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    try {
      const product = await this._model.findByIdAndDelete(id);
      resp.status(200).send({
        message: "Successfull delete"
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send(`An error occurred while deleting product ${id}`);
    }
  }

  public updateProduct = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    const data: IProduct = req.body;
    try {
      const product = await this._model.findByIdAndUpdate(id, data);
      resp.status(200).send({
        message: "Successfull updated"
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send(`An error occurred while updating product ${id}`);
    }
  }
}

export default ProductController;