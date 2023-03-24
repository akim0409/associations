const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Student = sequelize.define('Student', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  age: DataTypes.NUMBER
});

sequelize.sync();

module.exports = Student;