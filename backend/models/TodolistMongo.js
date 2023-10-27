const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
exports.Todolist = model("Todolist", new Schema({
    task: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}));