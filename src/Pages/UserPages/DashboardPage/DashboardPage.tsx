import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../../../Firebase';
import useLogData from '../../../Utils/useLogData';
import useUsername from '../../../Utils/useUsername';
import workInProgress from './work-in-progress.png';
import './Styles/styles.css';

function Dashboard() {
  const [user] = useAuthState(auth);
  const name = useUsername();
  const logs = useLogData();

  return (
    <div
      className="dashboard"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img src={workInProgress} alt="Work in progress" />
    </div>
  );
}
export default Dashboard;
