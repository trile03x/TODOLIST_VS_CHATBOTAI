const { where, Op } = require("sequelize");
const { Tasks } = require("../models/index")
const createTasks = async (req, res) => {
    const { taskTitle, taskLevel, taskType, endDay, startDay, descTask, status } = req.body;
    try {
        const newTask = await Tasks.create({ taskTitle, taskLevel, taskType, endDay, startDay, descTask, status });
        res.send(newTask);
    } catch (error) {
        res.send(error)
    }
};
const showTasks = async (req, res) => {
    const { taskTitle } = req.query;
    try {
        if (taskTitle) {
            const task = await Tasks.findOne({
                where: {
                    taskTitle: {
                        [Op.like]: `%${taskTitle}%`,
                    }
                }
            });
            res.send(task);
        }
        else {
            const listStation = await Tasks.findAll();
            res.send(listStation);
        }
    }
    catch (error) {
        res.send(error);
    }
}
const showDetailTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Tasks.findOne({
            where: {
                id,
            }
        });
        res.send(task);
    }
    catch (error) {
        res.send(error);
    }
};
const updateTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await Tasks.update(data, {
            where: {
                id,
            }
        });
        res.send("Update");
    }
    catch (error) {
        res.send(error);
    }
};
const deleteTasks = async (req, res) => {
    try {
        const { id } = req.params;
        await Tasks.destroy({
            where: {
                id,
            }
        })
        res.send("Removed");
    } catch (error) {
        res.send(error);
    }
}
module.exports = {
    createTasks,
    showTasks,
    showDetailTasks,
    updateTasks,
    deleteTasks
}
