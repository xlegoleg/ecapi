import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import IController from '@interfaces/eva/ControllerInterface';
import baseErrorHandler from '@middleware/BaseErrorHandler';

class App {
  public app: express.Application;
  public port: Number | String;

  constructor(controllers :IController[], port: Number | String) {
    this.app = express();
    this.port = port;

    this.initModules();
    this.initMiddleware();
    this.initControllers(controllers);
  }

  private initControllers(controllers: IController[]): void {
    controllers.forEach((controller: IController) => {
      this.app.use('/', controller.router());
    });
  }

  private initModules(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(cookieParser());
  }

  private initMiddleware(): void {
    this.app.use(baseErrorHandler);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${this.port}`);
    });
  }
}

export default App;