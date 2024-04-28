import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../database/database.js";

export const ParticipacionEnCombate = sequelize.define('ParticipacionEnCombates', {
    idLuchador: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    idCombate: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    }
});

export default ParticipacionEnCombate;
