import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { CreateUserDto } from '../dtos/UsersDTO';
import Route from '../interfaces/IRoutes';
import authMiddleware from '../middlewares/AuthMiddleware';
import validationMiddleware from '../middlewares/ValidationMiddleware';

class AuthRoute implements Route {
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/signup', validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post('/login', validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
    this.router.post('/logout', authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
