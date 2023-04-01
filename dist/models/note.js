"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
    }
}, { timestamps: true });
const Note = mongoose_1.models.Note || (0, mongoose_1.model)("Note", noteSchema);
exports.default = Note;
