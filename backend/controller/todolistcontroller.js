const { Todolist } = require("../models/TodolistMongo");
const { ObjectId } = require("mongodb")

const dateNow = new Date("<dd-mm-YYYYTHH:MM:ss>");

exports.createTodolist = async (req, res) => {
    const { title, content, priority, dueDates } = req.body;
    const todolist = await Todolist.create({ title, content, priority, dueDates, status: "Not Started", createdAt: dateNow, updatedAt: dateNow });
    todolist.author = req.user;
    await todolist.save();
    res.status(201).json(todolist);
}

exports.getTodolists = async (req, res) => {
    let query = { author: req.user };
    if (req.user.is_superuser()) {
        query = {};
    }
    const todolists = await Todolist.find(query).populate("author");
    res.status(200).json(todolists);
}

exports.updateTodolist = async (req, res) => {
    const { title, content, priority, dueDates, status } = req.body;
    const { id } = req.params;
    const filter = await Todolist.findOne({ _id: new ObjectId(id) });

    if (filter) {
        const update = await Todolist.updateOne({ title, content, priority, dueDates, status, updatedAt: dateNow });
        res.status(201).json(update);
    } else {
        res.status(401).json({ error: "Error occured during update process" });
        return;
    }
}

exports.deleteTodolist = async (req, res) => {
    const { id } = req.params;
    const remove = await Todolist.deleteOne({ _id: new ObjectId(id) });
    res.status(201).json(remove);

    if (filter) {
        const remove = await Todolist.deleteOne({ _id: new ObjectId(id) });
    } else {
        res.status(401).json({ error: "Error occured during delete process" });
        return;
    }
}