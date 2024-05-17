const { where, Op } = require("sequelize");
const { Tasks } = require("../models/index");
const createTasks = async (req, res) => {
  const { taskTitle, taskLevel, taskType, endDay, startDay, descTask, status } =
    req.body;
  try {
    const newTask = await Tasks.create({
      taskTitle,
      taskLevel,
      taskType,
      endDay,
      startDay,
      descTask,
      status,
    });
    res.status(200).send(newTask);
  } catch (error) {
    res.send(error);
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
          },
        },
      });
      res.send(task);
    } else {
      const listStation = await Tasks.findAll();
      res.send(listStation);
    }
  } catch (error) {
    res.send(error);
  }
};
const showDetailTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findOne({
      where: {
        id,
      },
    });
    res.send(task);
  } catch (error) {
    res.send(error);
  }
};
const showDetailTaskByQuery = async (req, res) => {
  try {
    const { taskLevel, taskType, status } = req.body;
    // console.log(taskLevel, taskType,status);
    if (taskLevel != -1 && taskType != -1 && status != -1) {
      let tasks = await Tasks.findAll({
        where: {
          taskType,
          taskLevel,
          status,
        },
      });
      res.status(200).send(tasks);
    } else if (taskLevel == -1 && taskType == -1 && status == -1) {
      let tasks = await Tasks.findAll();
      res.status(200).send(tasks);
    } else {
      res.status(404).send("Input data is not enough");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
const updateTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await Tasks.update(data, {
      where: {
        id,
      },
    });
    res.send("Update");
  } catch (error) {
    res.send(error);
  }
};
const deleteTasks = async (req, res) => {
  try {
    const { id } = req.params;
    await Tasks.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Removed");
  } catch (error) {
    res.status(404).send(error);
  }
};
module.exports = {
  createTasks,
  showTasks,
  showDetailTasks,
  updateTasks,
  deleteTasks,
  showDetailTaskByQuery,
};
