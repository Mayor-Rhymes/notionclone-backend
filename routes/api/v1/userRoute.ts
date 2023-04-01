import express, {Request, Response, Router} from 'express';
import {register, login, refresh} from '../../../controllers/userController';

const userRouter: Router = express.Router();


userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/refresh', refresh)




export default userRouter;

