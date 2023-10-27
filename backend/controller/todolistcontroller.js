const { Todolist } = require("../models/TodolistMongo");

const dateNow = new Date();

exports.createTodolist = async (req, res) => {
    const { task, description, priority } = req.body;
    const todolist = await Todolist.create({ task, description, priority, status: "pending", createdAt: dateNow, updatedAt: dateNow });
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

exports.getTodolistsById = async (req, res) => {
    const { id } = req.params;

    const getById = await Todolist.findOne({ _id: id });
    res.status(200).json(getById);
}

exports.updateTodolist = async (req, res) => {
    const { task, description, priority, status } = req.body;
    const { id } = req.params;
    const filter = await Todolist.findOne({ _id: id });

    const UpdateRequest = {
        task, description, priority, status, updatedAt: new Date()
    }

    if (filter) {
        const update = await Todolist.updateOne({ _id: id }, { $set: UpdateRequest });
        res.status(201).json(update);
    } else {
        res.status(401).json({ error: "Error occured during update process" });
        return;
    }
}

exports.deleteTodolist = async (req, res) => {
    const { id } = req.params;
    const filter = await Todolist.findOne({ _id: id });

    if (filter) {
        await Todolist.deleteOne({ _id: id });
        res.status(201).json({ message: "Task is successfully deleted" })
    } else {
        res.status(401).json({ error: "Error occured during delete process" });
        return;
    }
}