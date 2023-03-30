import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentShowPage = () => {
  const [student, setStudent] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  const params = useParams();

  const fetchStudentAndCourses = async () => {
    const response = await fetch(`http://localhost:3001/students/${params.studentId}`);
    const data = await response.json();
    setStudent(data.student);
    setEnrolledCourses(data.courses);
  }

  const fetchAllCourses = async () => {
    const response = await fetch('http://localhost:3001/courses');
    const data = await response.json();
    setAllCourses(data);
  };

  useEffect(() => {
    fetchStudentAndCourses();
    fetchAllCourses();
  }, []);

  if (student === null) {
    return null;
  }

  const enrolledCourseItems = enrolledCourses.map((course) => {
    return <div className="border border-black" key={course.id}>
      <div>{course.name}</div>
    </div>
  })

  const enrolledCourseIds = new Set();
  for (let i = 0; i < enrolledCourses.length; i += 1) {
    enrolledCourseIds.add(enrolledCourses[i].id);
  }

  const allCourseItems = allCourses.filter((course) => {
    return !(enrolledCourseIds.has(course.id));
  })
  .map(course => {
    return <div 
      key={course.id}
      onClick={async () => {
        await fetch(`http://localhost:3001/courses/${course.id}/students`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId: student.id}),
        })
        fetchStudentAndCourses();
      }}
    >
      <div>{course.name}</div>
    </div>
  })

  return (
    <div>
      <div className="flex">
      <div>{student.firstName}</div>
      <div>{student.lastName}</div>
      </div>
  
      <div>
        enrolled courses: {enrolledCourseItems}
      </div>

      <div>
        all courses: {allCourseItems}
      </div>
    </div>
  )
};

export default StudentShowPage;