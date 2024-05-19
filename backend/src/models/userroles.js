import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../database/database.js";


export const UserRole = sequelize.define('user_roles', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

export default UserRole;