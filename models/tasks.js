'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tasks.init({
    taskTitle: DataTypes.STRING,
    taskLevel: DataTypes.STRING,
    taskType: DataTypes.INTEGER,
    endDay: DataTypes.DATE,
    startDay: DataTypes.DATE,
    status:DataTypes.BOOLEAN,
    descTask: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};