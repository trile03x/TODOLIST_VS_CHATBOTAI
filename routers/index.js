const express = require("express");
const { taskRouter } = require("./task_router");
const{userRouter} = require("./user_router")
const rootRouter = express.Router();
rootRouter.use("/task", taskRouter);
rootRouter.use("/users", userRouter);
module.exports = {
    rootRouter,
}