import {sequelize} from "../db/connect";
import {DataTypes, Model} from "sequelize";
// import {IAuth} from "../types/type";

const Auth = sequelize.define("Auth",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
})


const sync = async () => {
    try {
        await Auth.sync();
        console.log("Auth tablosu oluşturuldu");    
    } catch (error) {
        console.log(error);
    }
}

sync();


export default Auth;
