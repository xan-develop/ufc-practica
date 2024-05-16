import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../database/database.js";
import Combate from "./combate.js";


export const Luchador = sequelize.define('luchadores' , {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    edad: {
        type: DataTypes.INTEGER
    },
    especialidad: {
        type: DataTypes.STRING
    },
    victorias: {
        type: DataTypes.INTEGER
    },
    derrotas: {
        type: DataTypes.INTEGER
    },
    nacionalidad: {
        type: DataTypes.STRING    
    },
    imagen: {
        type: DataTypes.STRING
    },
    rango: {
        type: DataTypes.INTEGER
    },
    altura:  {
        type: DataTypes.DOUBLE
    },
    finalizaciones: {
        type: DataTypes.INTEGER
    },
    kos: {
        type: DataTypes.INTEGER
    },
    decisiones:{
        type: DataTypes.INTEGER
    },
    alias:{
        type: DataTypes.STRING
    }
})
export default Luchador;




