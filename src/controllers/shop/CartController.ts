import CartModel from '@models/shop/Cart';
import ICart from '@interfaces/shop/CartInterface';
import IController from '@interfaces/eva/ControllerInterface';
import express, { Router } from 'express';
import { Document, now } from 'mongoose';
import { convertDateFromTimestamp } from '@utils/dates';
import authHandler from '@middleware/BaseAuthHandler';

class CartController implements IController {
  private _path: string = '/api/carts';
  private _router: Router = express.Router();
  private _model = CartModel;

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
    this._router.get(`${this._path}/:id`, this.getCartById);
    this._router
    .all(`${this._path}/*`, authHandler)
    .patch(`${this._path}/:id`, this.updateCart)
    .delete(`${this._path}/:id`, this.deleteCart)
    .post(`${this._path}`, this.createCart)
    .post(`${this._path}/add-item`, this.addToCart)
    .post(`${this._path}/remove-item`, this.removeFromCart);
  }

  public addToCart = async (req: express.Request, resp: express.Response): Promise<void> => {
    const { userId, productId, price, quantity } = req.body;
    try {
      let cart: ICart = await this._model.findOne({ user: userId }) as ICart;
      if (cart) {
        let itemIndex = cart.items.findIndex(p => p._id == productId);

        if (itemIndex > -1) {
          let productItem = cart.items[itemIndex];
          productItem.quantity = productItem.quantity + quantity;
          cart.items[itemIndex] = productItem;
        } else {
          cart.items.push({
            _id: productId,
            price: price,
            quantity: quantity
          });
        }
        cart.last_modified = convertDateFromTimestamp(Math.floor(Date.now()/1000),'YYYY-MM-DD');
        cart.status = 'active';
        cart = await cart.save();
        resp.status(201).send({
          message: "Cart updated",
          cart: cart
        });
      } else {
        const newCart = await this._model.create({
          products: [{
            _id: productId,
            price: price,
            quantity: quantity
          }],
          user: userId
        });
        resp.status(201).send({
          message: "Cart created",
          cart: newCart
        });
      }
    }
    catch (e) {
      console.log(e);
      resp.status(500).send(`An error occurred while added prodict ${productId} to cart`);
    }
  }

  public removeFromCart = async (req: express.Request, resp: express.Response): Promise<void> => {
    const { userId, productId } = req.body;
    try {
      let cart: ICart = await this._model.findOne({ user: userId }) as ICart;
      if (cart) {
        cart.items = cart.items.filter((item) => item._id !== productId);
        cart = await cart.save();
        resp.status(201).send({
          message: "Cart updated",
          cart: cart
        });
      } else {
        resp.status(404).send(`Can't find user ${userId} cart`);
      }
    }
    catch (e) {
      console.log(e);
      resp.status(500).send(`An error occurred while removing prodict ${productId} from cart`);
    }
  }

  public getCartById = async (req: express.Request, resp: express.Response): Promise<Document<ICart> | null> => {
    const id: String = req.params.id;
    try {
      const cart = await this._model.findById(id);
      resp.status(200).send(cart);
      return(cart);
    }
    catch(e) {
      console.log(e);
      resp.status(500).send(`An error occurred while getting cart ${id}`);
      return null;
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