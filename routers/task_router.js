const express = require("express");
const {Tasks} = require("../models/index");
const {checkEmty}= require("..//middleware/check");
const {createTasks,showTasks,showDetailTasks,updateTasks,deleteTasks} = require("../controllers/task_controller")
const taskRouter = express.Router();
taskRouter.post("/",createTasks);
taskRouter.get("/",showTasks);
taskRouter.get("/:id",checkEmty(Tasks),showDetailTasks);
taskRouter.put("/:id",checkEmty(Tasks),updateTasks);
taskRouter.delete("/:id",checkEmty(Tasks),deleteTasks)
module.exports={
    taskRouter,
}