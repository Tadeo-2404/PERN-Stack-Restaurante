import { Sequelize } from "sequelize"; //import sequelize
import dotenv from 'dotenv'; //import env var
dotenv.config();

//db connection
const connection = new Sequelize(process.env.NAME_DATABASE, process.env.USER_DATABASE, process.env.PASSWD_USER_DATABASE, {
    host: process.env.HOST_DATABASE,
    dialect: process.env.DIALECT_DATABASE,
    port: process.env.PORT_DATABASE,
    logging: false //disable sql logs
});

export default connection;