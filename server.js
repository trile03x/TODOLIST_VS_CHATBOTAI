const express = require("express");
const path = require("path");
const app = express();
const { sequelize } = require("./models");
const { rootRouter } = require("./routers/index")
// set string json 
app.use(express.json());
// set static file
const publicPath = path.join(__dirname, "./public");
app.use(express.static(publicPath));
// use router
app.use("/api/v1", rootRouter);
app.listen(3036, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})
