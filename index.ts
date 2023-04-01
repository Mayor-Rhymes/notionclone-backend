import express, {Request, Response, Express} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { corsOptions } from './config/cors';
import connectDB from './config/db';
import noteRouter from './routes/api/v1/noteRoute';
import userRouter from './routes/api/v1/userRoute';
import errorHandler from './middleware/errorMiddleware';
import authHandler from './middleware/authMiddleware';


dotenv.config();
const app: Express = express();

const port = process.env.PORT || 3000;

connectDB(process.env.DB_URL as string);


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(corsOptions));



app.get('/', (req: Request, res: Response) => {


    res.send("Typescript & express");


})



//api routes middleware

//authentication route
app.use('/api/v1/user', userRouter);

//authentication middleware
app.use(authHandler);

//notes middleware
app.use('/api/v1/notes', noteRouter);



//errorhandling middleware
app.use(errorHandler);




app.listen(port, () => {


    console.log(`Listening on port ${port}`);
})



