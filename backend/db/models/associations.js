const sequelize = require('../index');
const Course = require('./Course');
const Student = require('./Student');


// https://sequelize.org/docs/v6/core-concepts/assocs/
// https://sequelize.org/docs/v6/core-concepts/assocs/#foohasonebar


// Course.hasOne(Student); //hasOne teacher 

Course.belongsToMany(Student, {through: 'Enrollment'});

Student.belongsToMany(Course, {through: 'Enrollment'});


sequelize.sync();