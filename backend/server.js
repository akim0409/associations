const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const associations = require('./db/models/associations');
const Course = require('./db/models/Course');
const Student = require('./db/models/Student');


const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// GET /courses 
//    -> 200

// app.get('/courses', (req, res) => {
//   Course.findAll().then((courses) => res.status(200).json(courses));
// });

app.get('/courses', async (req, res) => {
  const courses = await Course.findAll();
  res.status(200).json(courses);
});


//
// GET /courses/:courseId 
//    -> 200
//    -> 404
//

// https://sequelize.org/docs/v6/core-concepts/assocs/#eager-loading-example
app.get('/courses/:courseId', async (req, res) => {
  const course = await Course.findOne({
    where: {id: req.params.courseId},
  });

  if (course) {
    const students = await course.getStudents();
    res.status(200).json({
      course,
      students
    });
  } else {
    res.status(404).json({ message: 'course not found'});
  }
})
// POST /courses
//    -> 201
//

app.post('/courses', async (req, res) => {
  await Course.create(req.body);
  res.status(201).json({message: 'course created'});
})


//  body { studentId: 1 }
app.post('/courses/:courseId/students', async (req, res) => {
  const course = await Course.findOne({ where: { id: req.params.courseId} });
  const student = await Student.findOne({ where: { id: req.body.studentId} });

  if (course && student) {
    course.addStudent(student);
    res.status(200).json({ message: `Student ${req.body.studentId} added to Course ${req.params.courseId}` });
  } else {
    res.status(404).json({message: 'course or student not found'});
  }

});

// GET /students
//    -> 200

app.get('/students', async (req, res) => {
  const students = await Student.findAll();
  res.status(200).json(students);
})
//
// GET /students/:studentId 
//    -> 200
//    -> 404

app.get('/students/:studentId', async (req, res) => {
  const student = await Student.findOne({
    where: {id: req.params.studentId}
  });


  if (student) {
    const courses = await student.getCourses();

    res.status(200).json({
      student,
      courses
    });
  } else {
    res.status(404).json({ message: 'student not found'});
  }
})
//
// POST /students
//    -> 201

app.post('/students', async (req, res) => {
  await Student.create(req.body);
  res.status(201).json({message: 'student created'});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});