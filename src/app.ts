import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { connect } from 'mongoose';
import { dbConnection } from './database';
import Routes from './interfaces/IRoutes';
import errorMiddleware from './middlewares/ErrorMiddleware';

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    connect(dbConnection.url, dbConnection.options)
      .then(() => {
        console.log('The database is connected.');
      })
      .catch((error: Error) => {
        console.log(`Unable to connect to the database: ${error}.`);
      });
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
