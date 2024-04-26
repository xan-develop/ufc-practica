import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../database/database.js";
import combate from "./combate.js";


export const Luchador = sequelize.define('luchador' , {
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
    idpeso: {
        type: DataTypes.INTEGER
    },
    imagen: {
        type: DataTypes.STRING
    }
})
Luchador.belongsToMany(combate, {
    through: 'ParticipacionEnCombate',
    foreignKey: 'idLuchador'
  });
  



export default Luchador;