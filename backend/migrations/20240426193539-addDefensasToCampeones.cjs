'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('campeones', 'defensas', {
      type: Sequelize.INTEGER,
      defaultValue: 0 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('campeones', 'defensas');
  }
};
