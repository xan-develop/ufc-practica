import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../database/database.js";
import Luchador from "./luchador.js";

// Definir el modelo

export const Combate = sequelize.define('combate' , {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    victoria: {
        type: DataTypes.INTEGER
    }
});
export default Combate;


