import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../database/database.js";


// Definir el modelo

export const Combate = sequelize.define('combate' , {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});


export default Combate;


