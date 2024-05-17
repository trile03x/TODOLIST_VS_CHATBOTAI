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
    await queryInterface.bulkInsert('tasks',
     [
      {
        taskTitle: "Coding CDIO",
        taskLevel: "3",
        taskType: "2",
        endDay: "2024-05-13 09:39:17",
        startDay: "2024-05-13 09:39:17",
        status: "1",
        descTask: "Ms Trinh",
        updatedAt: "2024-05-13 09:39:17",
        createdAt: "2024-05-13 09:39:17"

      },
      {
        taskTitle: "Coding FC2",
        taskLevel: "2",
        taskType: "2",
        endDay: "2024-05-13 09:39:17",
        startDay: "2024-05-13 09:39:17",
        status: "0",
        descTask: "MR Dieu",
        updatedAt: "2024-05-13 09:39:17",
        createdAt: "2024-05-13 09:39:17"
      },
      {
        taskTitle: "Create Document for Design",
        taskLevel: "3",
        taskType: "2",
        endDay: "2024-05-13 09:39:17",
        startDay: "2024-05-13 09:39:17",
        status: "1",
        descTask: "FPT SW",
        updatedAt: "2024-05-13 09:39:17",
        createdAt: "2024-05-13 09:39:17"
      },
      {
        taskTitle: "Clean the bedroom ",
        taskLevel: "1",
        taskType: "3",
        endDay: "2024-05-13 09:39:17",
        startDay: "2024-05-13 09:39:17",
        status: "0",
        descTask: "Dung clean the bedroom",
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
