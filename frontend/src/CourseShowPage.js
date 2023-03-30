import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const CourseShowPage = () => {
  const [course, setCourse] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const params = useParams();

  const getCourseAndStudents = async () => {
    const response = await fetch(`http://localhost:3001/courses/${params.courseId}`);
    const data = await response.json();
    setCourse(data.course);
    setEnrolledStudents(data.students);
  };

  const getAllStudents = async () => {
    const response = await fetch('http://localhost:3001/students');
    const data = await response.json();
    setAllStudents(data);
  };

  useEffect(() => {
    getCourseAndStudents();
    getAllStudents();
  }, []);

  if (course === null) {
    return null;
  }


  // Create a set that contains all of the ids of enrolledStudents
  const enrolledStudentIds = new Set();
  for (let i = 0; i < enrolledStudents.length; i += 1) {
    const studentId = enrolledStudents[i].id;
    enrolledStudentIds.add(studentId);
  }

  // filter example
  // const stuff = [1,2,3,5,2,4]; 
  // const newStuff = stuff.filter((ele) => {
  //   return ele % 2 === 0;
  // });
  // console.log(newStuff);


  const studentItems = enrolledStudents.map((student) => {
    return <div 
      className='flex border border-rose-300'
      key={student.id}
    >
      <div className='mx-1'>
        {student.firstName}
      </div>
      <div className='mr-1'>
        {student.lastName}
      </div>
      <div className=''>
       {student.age}
      </div>
    </div>
  });

  const allStudentItems = allStudents.filter((ele) => {
    return !(enrolledStudentIds.has(ele.id));
  }).map((student) => {
    return <div 
      key={student.id}
      className="cursor-pointer"
    >
      <div
        onClick={async () => {
          await fetch(`http://localhost:3001/courses/${course.id}/students`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ studentId: student.id}),
                })
          getCourseAndStudents();

        }}
      >{student.lastName}</div>
    </div>
  })

  return (
    <div>
      <div>{course.name}</div>
      <div>enrolled students:</div>
      <div className='border border-black'>
        {studentItems}
      </div>
      <div>enroll a new student:</div>
      <div className='border border-blue-400'>{allStudentItems}</div>
    </div>
  );

};

export default CourseShowPage;