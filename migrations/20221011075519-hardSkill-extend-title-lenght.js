'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.changeColumn('Hardskills', 'title', {
                type: Sequelize.STRING(5000),
                allowNull: false
            })
        ]);
    },

    async down(queryInterface, Sequelize) {
        return Promise.all([queryInterface.changeColumn('Hardskills', 'title')]);
    }
};
