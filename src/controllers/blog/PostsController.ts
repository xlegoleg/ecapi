import PostModel from '@models/blog/Post';
import IController from '@interfaces/eva/ControllerInterface';
import express, { Router } from 'express';
import authHandler from '@middleware/BaseAuthHandler';
import IPost from '@interfaces/blog/PostInterface';
import IQueryOptions from '@interfaces/eva/QueryOptionsInterface';
import BaseException from '@common/exceptions/BaseException';
import BaseMessage from '@common/messages/BaseMessage';

class PostController implements IController {
  private _path: string = '/api/blog/posts';
  private _router: Router = express.Router();
  private _model = PostModel;

  constructor() {
    this.initRoutes();
  }

  public path(): string {
    return this._path;
  }

  public router(): Router {
    return this._router;
  }

  private initRoutes() {
    this._router.get(`${this._path}`, this.getAllPosts);
    this._router.get(`${this._path}/:id`, this.getPostById);
    this._router.get(`${this._path}/news`, this.getNews);
    this._router
    .all(`${this._path}/*`, authHandler)
    .patch(`${this._path}/:id`, this.updatePost)
    .delete(`${this._path}/:id`, this.deletePost)
    .post(`${this._path}/create`, this.createPost);
  }

  public getAllPosts = async (req: express.Request, resp: express.Response): Promise<void> => {
    const queryOptions: IQueryOptions = {
      page: parseInt(String(req.query?.page)) || 1,
      perPage: parseInt(String(req.query?.perPage)) || 10
    }
    try {
      const posts = await this._model.find()
                          .skip((queryOptions.page - 1)*queryOptions.perPage)
                          .limit(queryOptions.perPage).exec();
      resp.status(200).send(posts);
    }
    catch(e) {
      new BaseException(500, 'An error occurred while getting posts');
    }
  }

  public getPostById = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    try {
      const post = await this._model.findById(id);
      resp.status(200).send(post);
    }
    catch(e) {
      new BaseException(500, `An error occurred while getting post ${id}`);
    }
  }

  public getNews = async (req: express.Request, resp: express.Response): Promise<void> => {
    try {
      const posts = await this._model.find().sort({ created: -1 }).limit(5).exec();
      resp.status(200).send(posts);
    }
    catch(e) {
      new BaseException(500, 'An error occurred while getting news');
    }
  }

  public createPost = async (req: express.Request, resp: express.Response): Promise<void> => {
    const data: IPost = req.body;
    try {
      const createdPost = await this._model.create(data);
      const msg = new BaseMessage(200, {
        message: 'Success',
        data: createdPost
      }, resp);
      msg.send();
    }
    catch (e) {
      new BaseException(500, 'An error occurred while creating post');
    }
  }

  public deletePost = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    try {
      const post = await this._model.findByIdAndDelete(id);
      const msg = new BaseMessage(200, {
        message: 'Successfull delete',
        data: post
      }, resp);
      msg.send();
    }
    catch (e) {
      new BaseException(500, `An error occurred while deleting post ${id}`);
    }
  }

  public updatePost = async (req: express.Request, resp: express.Response): Promise<void> => {
    const id: String = req.params.id;
    const data: IPost = req.body;
    try {
      const post = await this._model.findByIdAndUpdate(id, data);
      const msg = new BaseMessage(200, {
        message: 'Successfull updated',
        data: post
      }, resp);
      msg.send();
    }
    catch (e) {
      new BaseException(500, `An error occurred while updating post ${id}`);
    }
  }
}

export default PostController;