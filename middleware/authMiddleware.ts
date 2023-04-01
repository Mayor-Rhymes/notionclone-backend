import {Request, Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';
import { verify } from 'jsonwebtoken';
import User, { IUser } from '../models/user';



// This was done to add user property to the request object. I am surprised that the inbuilt request doesn't have a user type
export interface authRequest extends Request{

    user?: IUser;

}

//This was done to get the id of the user which is used to generate the token
interface idObject {

    id: string;
    iat: number;
    exp: number;
}


// This is the authentication handling function
const authHandler = asyncHandler(async (req: authRequest, res: Response, next: NextFunction): Promise<any> => {

     const authorization = req.headers.authorization;

     if (!authorization) return res.sendStatus(401);

     if(!authorization.startsWith("Bearer ")) return res.sendStatus(401);

     const token = authorization.split(' ')[1];

     const {id} = verify(token, process.env.ACCESS_TOKEN_SECRET as string) as idObject;


     const user = await User.findById(id);

     req.user = user as IUser;

     next();

})



export default authHandler;