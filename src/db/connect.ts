import {Sequelize} from "sequelize";
import config from "../config/config";


const sequelize = new Sequelize(config.db.database, config.db.user,  config.db.password, {
    dialect: "mysql",
    host: config.db.host
});


const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySql connection succesfully");
    } catch (error) {
        console.log("Bağlantı Hatası", error);
    }
}


export {connect, sequelize};