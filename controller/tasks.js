const Task = require('../models/Task')
const asyncWrapperMiddleware = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapperMiddleware(async (req, res) => {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
})

const createTask = asyncWrapperMiddleware(async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json({task})
})

const  getTask = asyncWrapperMiddleware(async (req, res, next) => {
        const {id: taskID} = req.params
        const task = await Task.findOne({_id: taskID})
        if(!task)
           return next(createCustomError(`Task with id: ${taskID} not found`, 404))
        res.status(200).json({task})
})

const updateTask = asyncWrapperMiddleware(async (req, res, next) => {
        const {id: taskID} = req.params
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators: true
        })

        if(!task)
            return next(createCustomError(`Task with id: ${taskID} not found`, 404))
        res.status(200).json({task})
})

const deleteTask = asyncWrapperMiddleware(async (req, res, next) => {
        const {id: taskID} = req.params
        const task = await Task.findOneAndDelete({_id: taskID})

        if(!task)
            return next(createCustomError(`Task with id: ${taskID} not found`, 404))
        res.status(200).json({task})
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}