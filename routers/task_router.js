const express = require("express");
const {authenticate}=require("../middleware/auth/authenticate");
const {Tasks} = require("../models/index");
const {checkEmty}= require("../middleware/validations/check");
const {createTasks,showTasks,showDetailTasks,updateTasks,deleteTasks,showDetailTaskByQuery} = require("../controllers/task_controller")
const taskRouter = express.Router();
taskRouter.post("/filter",showDetailTaskByQuery);
taskRouter.post("/create",createTasks);
taskRouter.get("/show",showTasks);
taskRouter.get("/:id",checkEmty(Tasks),showDetailTasks);
taskRouter.put("/:id",checkEmty(Tasks),updateTasks);
taskRouter.delete("/:id",checkEmty(Tasks),deleteTasks)
module.exports={
    taskRouter,
}