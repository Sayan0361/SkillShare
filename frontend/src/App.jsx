import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UploadSkill from './pages/UploadSkill';
import SignIn from './pages/SignIn';
import SignUp from './pages/Signup.';
import LeaderboardPage from './pages/LeaderboardPage';
import ChallengeMode from './pages/ChallengeMode';
import HallOfFame from './pages/HallOfFame';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadSkill/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/leaderboard" element={<LeaderboardPage/>}/>
        <Route path="/challenge" element={<ChallengeMode/>}/>
        <Route path="/hall-of-fame" element={<HallOfFame/>}/>
      </Routes>
    </Router>
  );
};

export default App;