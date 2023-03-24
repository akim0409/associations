const Course = require('../models/Course');
const Student = require('../models/Student');
const associations = require('../models/associations');

// https://sequelize.org/docs/v6/core-concepts/assocs/
// https://sequelize.org/docs/v6/core-concepts/assocs/#foohasonebar
const runSeeds = async () => {
  await Course.sync({ force: true }); //deletes all courses in database
  await Student.sync({ force: true });
  
  const scienceCourse = await Course.create({
    name: "Science"
  });

  const mathCourse = await Course.create({
    name: "Math"
  });

  const autumn = await Student.create({
    firstName: "Autumn",
    lastName: "Kim",
    age: 30
  });
  const alvin = await Student.create({
    firstName: "Alvin",
    lastName: "Zablan",
    age: 29
  });
  const donald = await Student.create({
    firstName: "Donald",
    lastName: "Liu",
    age: 29
  })

  // Course.hasOne(Student);
  // scienceCourse.setStudent(autumn);
  // mathCourse.setStudent(alvin);
  
  // Course.hasMany(Student);
  scienceCourse.addStudent(autumn);
  scienceCourse.addStudent(donald);
  mathCourse.addStudent(alvin);

  const count = await scienceCourse.countStudents();
  console.log(count);
  
  const studentss = await scienceCourse.getStudents({ raw: true });
  console.log(studentss);


 
  
  const courses = await Course.findAll({
    raw: true
  });

  const students = await Student.findAll({
    raw: true
  });

  console.table(courses);
  console.table(students);
};

runSeeds();