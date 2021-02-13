import CartModel from '@models/shop/Cart';
import ICart from '@interfaces/shop/CartInterface';
import IController from '@interfaces/eva/ControllerInterface';
import express, { Router } from 'express';

class CartController implements IController {
  private _path: String = '/api/carts';
  private _router: Router = express.Router();
  private _model = CartModel;

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
    this._router.get(`${this._path}/:id`, this.getCartById);
    this._router.patch(`${this._path}/:id`, this.updateCart);
    this._router.delete(`${this._path}/:id`, this.deleteCart);
    this._router.post(`${this._path}`, this.createCart);
  }

  public getCartById = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    try {
      const cart = await this._model.findById(id);
      resp.status(200).send(cart);
    }
    catch(e) {
      console.log(e);
      resp.status(500).send(`An error occurred while getting cart ${id}`);
    }
  }

  public createCart = async (req: express.Request, resp: express.Response): Promise<void> => {
    const data: ICart = req.body;
    try {
      const createdCart = await this._model.create(data);
      resp.status(200).send({
        message: "Success",
        cart: createdCart
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send('An error occurred while creating cart');
    }
  }

  public deleteCart = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    try {
      const cart = await this._model.findByIdAndDelete(id);
      resp.status(200).send({
        message: "Successfull delete"
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send(`An error occurred while deleting cart ${id}`);
    }
  }

  public updateCart = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    const data: ICart = req.body;
    try {
      const cart = await this._model.findByIdAndUpdate(id, data);
      resp.status(200).send({
        message: "Successfull updated"
      });
    }
    catch (e) {
      console.log(e);
      resp.status(500).send(`An error occurred while updating cart ${id}`);
    }
  }
}

export default CartController;