import mongoose from 'mongoose';

const connectDB = (url: string) => {

    
    
    try{
      
       mongoose.connect(url);



    } catch(err){

        console.error(err);
    }
    

}


export default connectDB;