const asyncWrapper = require('../middleware/async');
const Task = require('../models/Task')

// const getAllTask = async (req, res) => {
//     console.log("getAllTask called!!!");
//     try {
//         const alltask = await Task.find({})
//         res.status(200).json({ alltask })
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }
const getAllTask = asyncWrapper(async (req, res) => {
    const alltask = await Task.find({})
    res.status(200).json({ alltask })
})



const createTask = async (req, res) => {
    console.log("createTask called!!!");
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
const getTask = async (req, res) => {
    console.log("getTask called!!!");
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: `No Task with this id = ${taskID}` })
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg: error})
    }

}
const updateTask = async (req, res) => {
    console.log("updateTask called!!!");
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {new:true, runValidators:true})
        if(!task){
            return res.status(404).json({msg: `No task found with this is = ${taskID}`})
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const deleteTask = async (req, res) => {
    console.log("deleteTask called!!!");
    try {
        const {id:taskID} = req.params;
        const task = await Task.findByIdAndDelete({_id:taskID})
        if(!task){
            res.status(404).json({msg:`No Task Found with this id = ${taskID}`})
        }
        res.status(200).json({"task":task, "status":"true"})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getAllTask, createTask, getTask, updateTask, deleteTask
}