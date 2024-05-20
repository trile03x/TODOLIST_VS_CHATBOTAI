const { where } = require("sequelize");
const { user } = require("../models/index");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");
// register
const register = async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        const checkEmail = await user.findOne({
            where: {
                email: email,
            }
        });
        if (checkEmail != null) {
            res.status(400).send("fail");
        }
        else {
            // random string to encrypt
            const salt = bcryptjs.genSaltSync(10);
            // String encrypt salt + pass
            const hashPass = bcryptjs.hashSync(pass, salt);
            const newUser = await user.create({ name, email, pass: hashPass });
            if (newUser) {
                res.status(200).send(newUser);
            }
        }

    } catch (error) {
        res.send(error)
    }
};
// login
const login = async (req, res) => {
    const { email, pass } = req.body;
    const userLogin = await user.findOne({
        where: {
            email,
        }
    })
    if (userLogin) {
        const checkPass = bcryptjs.compareSync(pass, userLogin.pass);
        if (checkPass) {
            const token = jwt.sign({ email: userLogin.email, pass: userLogin.pass }, "usersTokenLogin", { expiresIn: 60 * 60 });
            res.status(200).send({
                mess: "Login success",
                token
            });
        }
        else {
            res.status(404).send("Login fail");
        }
    }
    else {
        res.status(404).send("Not found");
    }
}
const showInfo = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
        const userLogin = await user.findOne({
            where: {
                email,
            }
        })
        const userInfo = {
            email: userLogin.email,
            name: userLogin.name,
        };

        return res.status(200).send(userInfo);
    } catch (error) {
        res.send(error);
    }
}
const updateUser = async (req, res) => {
    const { email, name, pass, emailCheck } = req.body;
    const userCheck = await user.findOne({
        where: {
            email: emailCheck
        }
    })
    const userID = userCheck.id;
    //ma hoa pass
    // sinh chuoi ngau n hien
    const salt = bcryptjs.genSaltSync(10);
    // String encrypt salt + pass
    const hashPass = bcryptjs.hashSync(pass, salt);
    try{
        await user.update({
            name: name,
            pass: hashPass,
            email: email}, 
        {
            where: {
                id:userID
            }
        })
        res.status(200).send("Updated");
    }
    catch(error)
    {
        res.send(error);
    }
}
module.exports = {
    register,
    login,
    showInfo,
    updateUser
}