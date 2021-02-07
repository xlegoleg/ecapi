import { Router } from 'express';

declare interface IController {
  path(): String;
  router(): Router;
}

export default IController;