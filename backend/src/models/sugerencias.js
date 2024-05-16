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
    peleas: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    evento:{
        type: DataTypes.STRING,
    },
    descripcion: {
        type: DataTypes.STRING,
    }
    
});

export default Sugerencia;