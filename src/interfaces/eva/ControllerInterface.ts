import { Router } from 'express';

declare interface IController {
  path(): string;
  router(): Router;
}

export default IController;