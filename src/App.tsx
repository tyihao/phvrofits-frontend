import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navigation/Navbar';
import * as Pages from './Pages';
import './Styles/App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/about" element={<Pages.About />} />
        <Route path="/" element={<Pages.Home />} />
        <Route path="/signin" element={<Pages.SignIn />} />
        <Route path="/signup" element={<Pages.SignUp />} />
        <Route path="/dashboard" element={<Pages.DashboardPage />} />
        <Route path="/account" element={<Pages.AccountPage />} />
        <Route path="/submit" element={<Pages.SubmitLogPage />} />
        <Route path="/reset" element={<Pages.ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
