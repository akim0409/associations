const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Course = sequelize.define('Course', {
  name: DataTypes.STRING
});

sequelize.sync(); //this saves Course operation

module.exports = Course;