import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from "../database/database.js";
import bcrypt from 'bcrypt';

export const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            
            const hashedPassword = bcrypt.hashSync(value, 10);
            this.setDataValue('clave', hashedPassword);
        }
    }
}, {
    timestamps: false 
});

export default Users;
