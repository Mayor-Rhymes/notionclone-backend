import express, {Request, Response, Express, Router} from 'express';
import { getNotes, addNote, getNote, updateNote, deleteNote} from '../../../controllers/noteController';

const noteRouter : Router = express.Router()



noteRouter.route('/')
      .get(getNotes)
      .post(addNote);


noteRouter.route('/:id')
      .get(getNote)
      .patch(updateNote)
      .delete(deleteNote);



export default noteRouter;