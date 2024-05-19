import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../database/database.js";


export const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
})

export default Role;