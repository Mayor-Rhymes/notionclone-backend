import asyncHandler from 'express-async-handler';
import {Request, Response} from 'express';
import Note from '../models/note'
import { authRequest } from '../middleware/authMiddleware';


interface Note {

    title: string;
    content: string;
}


//method => get
//url => /

const getNotes = asyncHandler(async (req: authRequest, res: Response): Promise<any> => {

     const id = req.user?._id;
     const notes = await Note.find({userId: id});
     
    

     if (!notes.length) {
        return res.status(404).json({message: "No notes found"});
     }
     
     res.status(200).json({notes, total: notes.length});

});



//method -> get
//url -> /:id
const getNote = asyncHandler(async (req: authRequest, res: Response): Promise<any> => {
    
    const {id} = req.params;
    const userId = req.user?._id;
    const note = await Note.findOne({_id: id, userId: userId});
    
    if (!note) {
        return res.sendStatus(403);
    }
    res.status(200).json(note);


})



//method -> patch
//url -> /:id
const updateNote = asyncHandler(async (req: authRequest, res: Response): Promise<any> => {
    
    const {id} = req.params;
    const userId = req.user?._id;
    const note = await Note.findOne({_id: id, userId: userId});
    
    if (!note) {
        return res.sendStatus(403)
    }
    

    const {title, content} = req.body as Note;
    const updateNote = await Note.findOneAndUpdate({_id: id, userId: userId}, {
         title, content
    }, {new: true});


    if (!updateNote) {

        return res.status(400).json({message: `Note with id ${id} could not be modified`});
    }

    res.status(201).json(updateNote);



})


//method -> post
//url -> /
const addNote = asyncHandler(async (req: authRequest, res: Response): Promise<any> => {
    
    const {title, content} = req.body as Note;
    const userId = req.user?._id;
    
    const note = await Note.create({title, content, userId});
    

    if (!title || !content) {

        return res.status(400).json({message: "title and content are required"});
    }

    if(!note) {

        return res.status(400).json({message: "Note could not be created"});
    }

    res.status(200).json({message: "Note created successfully", note});


})


//method -> delete;
//url -> /:id
const deleteNote = asyncHandler(async (req: authRequest, res:Response):Promise<any> => {

    const {id} = req.params;
    const userId = req.user?._id;
    const note = await Note.findOne({_id: id, userId: userId});


    if (!note) {
        return res.sendStatus(403);
    }

    const deleteNote = await Note.findOneAndDelete({_id: id, userId: userId});

    if (!deleteNote) {
     
        return res.status(400).json({message: `Note could not be deleted!`});
    } 

    res.status(200).json({message: "Note deleted successfully", deleteNote});
})


export {

    getNotes,
    getNote,
    addNote,
    updateNote,
    deleteNote,
};

