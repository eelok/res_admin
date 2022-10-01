'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users_Educations', {
      // id: {
      //   allowNull: false,
      //   type: Sequelize.UUID,
      //   defaultValue: Sequelize.UUIDV4,
      //   primaryKey: true,
      // },
      userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references: { model: {tableName: 'Users'}, key: 'id' },
        onDelete: 'CASCADE',
      },
      educationId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references: { model: {tableName:'Educations'}, key: 'id' },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users_Educations');
  }
};