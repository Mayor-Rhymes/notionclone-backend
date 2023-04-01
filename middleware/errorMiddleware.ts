import {Request, Response, NextFunction, ErrorRequestHandler} from 'express';



const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {



    let statusCode = res.statusCode || 500;

    let message = err.message || "Something went wrong";

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : null
    });

    next();
}


export default errorHandler;