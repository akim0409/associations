import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseList from "./CourseList";
import CourseShowPage from "./CourseShowPage";
import StudentList from "./StudentList";
import StudentShowPage from "./StudentShowPage";
import NavBar from "./NavBar";
// frontend routes
//  /courses -> list all courses
//  /courses/:courseId -> list course and all student names enrolled in course
//  /students -> list all stoods
//  /students/:studentId -> list student and all courses the student is enrolled in
const App = () => {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path='/courses' Component={CourseList}/>
        <Route path="/courses/:courseId" Component={CourseShowPage} />
        <Route path="/students" Component={StudentList} />
        <Route path="/students/:studentId" Component={StudentShowPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
