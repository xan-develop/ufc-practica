import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../database/database.js";
import luchador from "./luchador.js";

// Definir el modelo

export const Combate = sequelize.define('combate' , {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idArbitro: {
        type: DataTypes.INTEGER
    },
    idEvento: {
        type: DataTypes.INTEGER
    },
    victoria: {
        type: DataTypes.INTEGER
    }
});


Combate.belongsToMany(luchador, {
    through: 'ParticipacionEnCombate',
    foreignKey: 'idCombate'
  });
  


export default Combate;
