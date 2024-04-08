import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignIn from './pages/SignIn';
import UserHome from './pages/UserHome';
import CoursePage from './pages/Courses/CoursePage'
import CourseGradePage from './pages/Courses/CourseGradePage'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oneStopEd/sign-in" element={<SignIn />} />
        <Route path="/oneStopEd/courses/:courseName" element={<CoursePage />} />
        <Route path="/oneStopEd/courses/:courseName/:gradeNumber" element={<CourseGradePage />} />
        <Route path="/oneStopEd/:userId/:username" element={<UserHome/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
