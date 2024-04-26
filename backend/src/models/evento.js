import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../database/database.js";
import combate from "./combate.js";


export const Evento = sequelize.define('evento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    fecha: {
        type: DataTypes.DATE
    },
    localizacion:{
        type: DataTypes.STRING
    },
    
})

//One to many evento -> combate
Evento.hasMany(combate, {
    foreignKey: 'idevento',
    sourceKey: 'id'
})

combate.belongsTo(Evento, {
    foreignKey: 'idevento',
    targetId: 'id'
})