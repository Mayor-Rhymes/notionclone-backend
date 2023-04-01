import { Schema, models, model, } from 'mongoose'


const noteSchema = new Schema({

    title: {
        type: String,
        required: [true, "Please enter title"],
        minLength: 3,
        maxLength: 30,
    },

    content: {

        type: String,
        required: [true, "Please enter content"],
        minLength: 3,
        

    },

    userId: {

        type: Schema.Types.ObjectId,
        
    }


},
{timestamps: true}
);


const Note = models.Note || model("Note", noteSchema);


export default Note;