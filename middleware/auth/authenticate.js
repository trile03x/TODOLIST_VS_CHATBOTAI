const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
    try {
        const token = req.header("token");
        const decode = jwt.verify(token, "usersTokenLogin");
        if (decode) {
            next();
        }

    }
    catch (error) {
        res.send(error);
    }
};

module.exports = {
    authenticate,
}
