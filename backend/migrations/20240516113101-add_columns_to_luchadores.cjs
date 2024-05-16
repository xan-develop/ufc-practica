'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('luchadores', 'altura', {
      type: Sequelize.DOUBLE,
    });
    await queryInterface.addColumn('luchadores', 'finalizaciones', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('luchadores', 'kos', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('luchadores', 'decisiones', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('luchadores', 'alias', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('luchadores', 'altura');
    await queryInterface.removeColumn('luchadores', 'finalizaciones');
    await queryInterface.removeColumn('luchadores', 'kos');
    await queryInterface.removeColumn('luchadores', 'decisiones');
    await queryInterface.removeColumn('luchadores', 'alias');
  }
};
 