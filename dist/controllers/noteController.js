"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.addNote = exports.getNote = exports.getNotes = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const note_1 = __importDefault(require("../models/note"));
//method => get
//url => /
const getNotes = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const notes = yield note_1.default.find({ userId: id });
    if (!notes.length) {
        return res.status(404).json({ message: "No notes found" });
    }
    res.status(200).json({ notes, total: notes.length });
}));
exports.getNotes = getNotes;
//method -> get
//url -> /:id
const getNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const note = yield note_1.default.findOne({ _id: id, userId: userId });
    if (!note) {
        return res.sendStatus(403);
    }
    res.status(200).json(note);
}));
exports.getNote = getNote;
//method -> patch
//url -> /:id
const updateNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.params;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const note = yield note_1.default.findOne({ _id: id, userId: userId });
    if (!note) {
        return res.sendStatus(403);
    }
    const { title, content } = req.body;
    const updateNote = yield note_1.default.findOneAndUpdate({ _id: id, userId: userId }, {
        title, content
    }, { new: true });
    if (!updateNote) {
        return res.status(400).json({ message: `Note with id ${id} could not be modified` });
    }
    res.status(201).json(updateNote);
}));
exports.updateNote = updateNote;
//method -> post
//url -> /
const addNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { title, content } = req.body;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
    const note = yield note_1.default.create({ title, content, userId });
    if (!title || !content) {
        return res.status(400).json({ message: "title and content are required" });
    }
    if (!note) {
        return res.status(400).json({ message: "Note could not be created" });
    }
    res.status(200).json({ message: "Note created successfully", note });
}));
exports.addNote = addNote;
//method -> delete;
//url -> /:id
const deleteNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { id } = req.params;
    const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e._id;
    const note = yield note_1.default.findOne({ _id: id, userId: userId });
    if (!note) {
        return res.sendStatus(403);
    }
    const deleteNote = yield note_1.default.findOneAndDelete({ _id: id, userId: userId });
    if (!deleteNote) {
        return res.status(400).json({ message: `Note could not be deleted!` });
    }
    res.status(200).json({ message: "Note deleted successfully", deleteNote });
}));
exports.deleteNote = deleteNote;
