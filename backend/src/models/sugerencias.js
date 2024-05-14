import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../database/database.js";

export const Sugerencia = sequelize.define('sugerencias' , {
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
    luchador1: {
        type: DataTypes.STRING,
    },
    luchador2: {
        type: DataTypes.STRING,
    },
    descripcion: {
        type: DataTypes.STRING,
    }
    
});

export default Sugerencia;