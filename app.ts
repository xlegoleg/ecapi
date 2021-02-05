import express from 'express';
import bodyParser from 'body-parser';
import IController from '@interfaces/eva/ControllerInterface';

class App {
  public app: express.Application;
  public port: Number | String;

  constructor(controllers :IController[], port: Number | String) {
    this.app = express();
    this.port = port;

    this.initControllers(controllers);
  }

  private initControllers(controllers: IController[]): void {
    controllers.forEach((controller: IController) => {
      this.app.use('/', controller.router);
    });
  }

  private initModules(): void {
    this.app.use(bodyParser.json());
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${this.port}`);
    });
  }
}

export default App;