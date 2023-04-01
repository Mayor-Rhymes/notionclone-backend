import asyncHandler from 'express-async-handler';
import {Request, Response} from 'express';
import User from '../models/user';
import { sign, verify } from 'jsonwebtoken';



//method -> post
//url -> /register

const register = asyncHandler( async (req: Request, res: Response): Promise<any> => {



   const {email, username, password} = req.body;
   
   
   const user = await User.createUser(email, username, password);
   console.log(user)

   if (!user) {

     return res.status(400).json({message: "Sign up failed"});
   }

   

   console.log(user._id)

   const accessToken = generateToken(user._id, process.env.ACCESS_TOKEN_SECRET as string, '1d');

   //const refreshToken = generateToken(user._id, process.env.REFRESH_TOKEN_SECRET as string, '1d');
   //res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 480 * 60 * 60 * 1000})

   console.log(user);

   res.status(200).json({message:"Signup successful", email: user.email, username: user.username, token: accessToken});
    
})



//method -> post
//url -> /login
const login = asyncHandler( async (req: Request, res: Response): Promise<any> => {



   const {email, password} = req.body;
   const user = await User.loginUser(email, password);

   if (!user) {

     return res.status(400).json({message: "Login failed"});
   }

   const accessToken = generateToken(user._id, process.env.ACCESS_TOKEN_SECRET as string, '1d');

   console.log(user);

   res.status(200).json({message: "Login successful", email: user.email, username: user.username, token: accessToken});
    
})


const refresh = asyncHandler( async (req: Request, res: Response): Promise<any> => {

   
      
})


const generateToken = (id: string, secret: string, expiration: string): string => {

    return sign({id},  secret, {

        expiresIn: expiration
    });

}



export {

    register,
    login,
    refresh,
}