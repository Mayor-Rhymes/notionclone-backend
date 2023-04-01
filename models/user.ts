import {Schema, Model, model, models} from 'mongoose';
import {genSalt, hash, compare} from 'bcrypt';


export interface IUser{

    _id: string,
    email: string;
    username: string;
    password: string;
    
}


interface UserModel extends Model<IUser>{

    createUser(email: string, username: string,  password: string): IUser;
    loginUser(email: string, password: string): IUser;
}


const userSchema = new Schema<IUser, UserModel>({

    email: {

        type: String,
        required: [true, "Please enter email"],
        

    },

    username: {

        type: String,
        required: [true, "Please enter username"],
    },

    password:{

        type: String,
        required: [true, "Please enter password"],
    }
},
{timestamps: true}

);



    


userSchema.statics.createUser = async function (email: string, username: string, password: string) {
    
    const userExists = await this.findOne({email: email});

    if (userExists) {

        // return new Error(`User with email ${email} already exists`);
        return false
    }

    const usernameExists = await this.findOne({username: username});

    if (usernameExists) {

        // return new Error(`User with username ${username} already exists`);
        return false
    } else {
       
        const salt: string = await genSalt(10);
        const hashPassword = await hash(password, salt);

        const user = await this.create({email, username, password: hashPassword});

        return user;

    }

    


    


}


userSchema.statics.loginUser = async function (email: string, password: string) {
    
    const userExists = await this.findOne({email: email});

    if (!userExists) {

        // return new Error(`User with email ${email} does not exist`);
        return false;
    }


    const matchedPassword = await compare(password, userExists.password);

    if (!matchedPassword) {

        // return new Error(`Invalid Password`)
        return false;
    }


    
    return userExists;
    


}



const User = model<IUser, UserModel>('User', userSchema);

export default User;