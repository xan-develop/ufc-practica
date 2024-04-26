import Sequelize from 'sequelize'
export const sequelize = new Sequelize('ufc' , 'postgres' , 'onmula',{
host: 'localhost',
dialect: 'postgres'
});