import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import Home from './Components/Home';
import NewDiaryPage from './Components/NewDiaryPage';
import IndividualStoryComponent from './Components/IndividualStoryComponent';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/newdiarypage' element={<NewDiaryPage/>}/>
        <Route path='/individualstory/:id' element={<IndividualStoryComponent />} />
      </Routes>
    </Router>
  );
}

export default App;

