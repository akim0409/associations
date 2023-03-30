import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchAllStudents = async () => {
    const response = await fetch('http://localhost:3001/students')
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const studentItems = students.map((student) => {
    return <div 
      className="flex" 
      key={student.id}
      onClick={() => {
        navigate(`/students/${student.id}`)
      }}
    >
      <div>{student.firstName}</div>
      <div>{student.lastName}</div>
    </div>
  })

  return (
    <div>
      {studentItems}
    </div>
  )
};




export default StudentList;
