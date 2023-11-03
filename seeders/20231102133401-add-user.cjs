/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('users', [{
      balance: 10000,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
