const { where } = require("sequelize");
const { user } = require("../models/index");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// register
const register = async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        // random string to encrypt
        const salt = bcryptjs.genSaltSync(10);
        // String encrypt salt + pass
        const hashPass = bcryptjs.hashSync(pass, salt);
        const newUser = await user.create({ name, email, pass: hashPass });
        res.status(200).send(newUser);

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
            res.send("Login fail");
        }
    }
    else {
        res.status(404).send("Not found");
    }
}
module.exports = {
    register,
    login
}