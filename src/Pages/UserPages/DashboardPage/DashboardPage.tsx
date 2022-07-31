import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../../../Firebase';
import useLogData from '../../../Utils/useLogData';
import useUsername from '../../../Utils/useUsername';
import './Styles/styles.css';

function Dashboard() {
  const [user] = useAuthState(auth);
  const name = useUsername();
  const logs = useLogData();

  return <div className="dashboard">Dashboard Page</div>;
}
export default Dashboard;
