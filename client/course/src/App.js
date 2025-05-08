import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./login";
import Signup from "./signup";
import Navbar from "./components/Navbar";
import Dashboard from "./dashboard";
import Cookies from "js-cookie"
import AdminLogin from './adminLogin';
import AdminSignup from './adminSignup/signup';
import AdminCourses from './admincourses/AdminCourses';
import UserCourses from './userCourses';
import Courses from './components/Courses';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard/*"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin-signup' element={<AdminSignup />} />
        <Route path='/admin-courses' element={<AdminCourses />} />
        <Route path='/all-courses' element={<Courses />} />
        

      </Routes>
    </Router>
  );
}

export default App;
