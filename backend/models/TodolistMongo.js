const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
exports.Todolist = model("Todolist", new Schema({
    task: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    dueDates: { type: Date, required: true },
    status: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date },
    updatedAt: { type: Date },
}));