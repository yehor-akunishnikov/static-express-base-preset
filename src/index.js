const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const homeRouter = require("./routers/home.router");
const testRouter = require("./routers/test.router");
const userRouter = require("./routers/user.router");

const sequelize = require("./config/db.config");

const app = express();
const port = 3010;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("static"));
app.use(express.static("vendor"));
app.use("/", homeRouter);
app.use("/test", testRouter);
app.use("/users", userRouter);

app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
