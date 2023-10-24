const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
exports.Todolist = model("Todolist", new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    priority: { type: String, required: true },
    dueDates: { type: String, required: true },
    status: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: String },
    upadatedAt: { type: String }
}));