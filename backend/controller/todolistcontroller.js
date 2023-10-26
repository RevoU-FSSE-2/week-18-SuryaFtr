const { Todolist } = require("../models/TodolistMongo");
const { ObjectId } = require("mongodb")

const dateNow = new Date();
const upDateNow = new Date();

exports.createTodolist = async (req, res) => {
    const { task, description, priority, dueDates } = req.body;
    const todolist = await Todolist.create({ task, description, priority, dueDates, status: "Not Started", createdAt: dateNow, updatedAt: dateNow });
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
    const { task, description, priority, dueDates } = req.body;
    const { id } = req.params;
    const filter = await Todolist.findOne({ _id: new ObjectId(id) });

    if (filter) {
        const update = await Todolist.updateOne({ task, description, priority, dueDates, updatedAt: upDateNow });
        res.status(201).json(filter);
    } else {
        res.status(401).json({ error: "Error occured during update process" });
        return;
    }
}

exports.deleteTodolist = async (req, res) => {
    const { id } = req.params;
    const filter = await Todolist.findOne({ _id: new ObjectId(id) });

    if (filter) {
        await Todolist.deleteOne({ _id: new ObjectId(id) });
        res.status(201).json({ message: "Task is successfully deleted" })
    } else {
        res.status(401).json({ error: "Error occured during delete process" });
        return;
    }
}