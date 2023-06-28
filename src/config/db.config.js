const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.PASSWORD,
    {
        dialect: "mysql",
        port: parseInt(process.env.PORT),
        host: process.env.HOST,
        logging: console.log,
        define: {
            timestamps: false
        }
    }
);

module.exports = sequelize;