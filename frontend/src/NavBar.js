import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="bg-blue-300 text-white">
      <Link 
      className={location.pathname === '/students' ? 'text-black' : null}
        to='/students'>Students</Link>
      <Link 
      className={location.pathname === '/courses' ? 'text-black' : null}
      to='/courses'>Courses</Link>
    </div>
  )
};

export default NavBar;