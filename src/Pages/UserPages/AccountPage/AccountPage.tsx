import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './Styles/styles.css';
import { auth, db, logout } from '../../../Firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
import useUsername from '../../../Utils/useUsername';

const AccountPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const name = useUsername();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
  }, [user, loading]);
  return (
    <div className="account">
      <div className="account__container">
        Logged in as
        <div>{name}</div>
        <div>{user && user.email}</div>
        <button className="account__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default AccountPage;
