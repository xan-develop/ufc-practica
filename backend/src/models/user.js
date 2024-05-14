import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../database/database.js";

export const Users = sequelize.define('users' , {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: DataTypes.STRING,
    },
    correo: {
        type: DataTypes.STRING,
    },
    clave: {
        type: DataTypes.STRING,
    }
    
});

export default Users;