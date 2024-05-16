'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users',
      [
        {
          name: "Le Van Tri",
          email: "levantri@hotmail.com",
          pass: "123",
          updatedAt: "2024-05-13 09:39:17",
          createdAt: "2024-05-13 09:39:17"
        },
        {
          name: "Dang Van Nho",
          email: "vannho@hotmail.com",
          pass: "1234",
          updatedAt: "2024-05-13 09:39:17",
          createdAt: "2024-05-13 09:39:17"
        },
        {
          name: "Nguyen Tan Dung",
          email: "tandung@hotmail.com",
          pass: "1235",
          updatedAt: "2024-05-13 09:39:17",
          createdAt: "2024-05-13 09:39:17"
        }
      ],
      {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
