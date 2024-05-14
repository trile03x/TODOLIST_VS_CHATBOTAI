const express = require("express");
const {user} = require("../models/user");
// const {checkEmty}= require("..//middleware/check");
const {register,login} = require("../controllers/user_controller")
const userRouter = express.Router();
userRouter.post("/register",register);
userRouter.post("/login",login)
module.exports={
    userRouter,
}