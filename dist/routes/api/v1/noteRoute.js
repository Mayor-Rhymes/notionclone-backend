"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../../../controllers/noteController");
const noteRouter = express_1.default.Router();
noteRouter.route('/')
    .get(noteController_1.getNotes)
    .post(noteController_1.addNote);
noteRouter.route('/:id')
    .get(noteController_1.getNote)
    .patch(noteController_1.updateNote)
    .delete(noteController_1.deleteNote);
exports.default = noteRouter;
