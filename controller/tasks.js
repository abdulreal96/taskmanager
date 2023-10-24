const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    }catch (e) {
        res.status(500).json({msg: e})
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    }catch (e) {
        res.status(500).json({msg: e})
    }
}

const  getTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findOne({_id: taskID})
        if(!task)
            return res.status(404).json({msg: `Task with id: ${taskID} not found`})
        res.status(200).json({task})
    }catch (e) {
        res.status(500).json({msg: e})
    }
}

const updateTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators: true
        })

        if(!task)
            return res.status(404).json({msg: `Task with id: ${taskID} was not found`})
        res.status(200).json({task})
    }catch (e) {
        res.status(500).json({msg: e})
    }
}

const deleteTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findOneAndDelete({_id: taskID})

        if(!task)
            return res.status(404).json({msg: `Task with id: ${taskID} was not found`})
        res.status(200).json({task})
    }catch (e) {
        res.status(500).json({msg: e})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}