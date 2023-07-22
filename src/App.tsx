import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Routes, Route } from 'react-router-dom';
import { auth } from './Firebase';
import Navbar from './Navigation/Navbar';
import * as Pages from './Pages';

function App() {
  const [, loading] = useAuthState(auth);

  return (
    <div style={{ background: '#FAFAFA' }}>
      {!loading && (
        <>
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
            <Route
              path="/earnings-logbook"
              element={<Pages.EarningsLogbookPage />}
            />
            <Route path="/fuel-logbook" element={<Pages.FuelLogbookPage />} />
          </Routes>
        </>
      )}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
