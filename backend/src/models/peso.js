import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../database/database.js";
import luchador from './luchador.js';

export const Peso = sequelize.define('peso' , {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    }
})
export default Peso;
// One to many : peso -> luchador
Peso.hasMany(luchador , {
    foreingKey: 'idpeso',
    sourceKey: 'id'
})
luchador.belongsTo(Peso,{
    foreingKey: 'idpeso',
    targetId: 'id'
})