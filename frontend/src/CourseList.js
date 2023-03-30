import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getCourses = async () => {
    // fetch('http://localhost:3001/courses')
    //   .then(response => response.json())
    //   .then(data => setCourses(data));

    const response = await fetch('http://localhost:3001/courses');
    const data = await response.json();
    setCourses(data);
  };

  console.log(courses);
  useEffect(() => {
    getCourses();
  }, []);

  const courseItems = courses.map((course) => {
    return <div 
      key={course.id}
      className="border border-black p-2 m-2"
      onClick={() => {
        navigate(`/courses/${course.id}`)
      }}
    >
      {course.name}
    </div>
  })
  return (
    <div>
      <div>course list</div>
      {courseItems}
    </div>
    
  )
};

export default CourseList;