import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../../../Firebase';
import useUserInfo from '../../../Utils/useUserInfo';
import './Styles/styles.css';

const AccountPage = () => {
  const [user, loading] = useAuthState(auth);
  const userInfo = useUserInfo();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
  }, [user, loading, navigate]);

  return (
    <div className="account">
      <div className="account__container">
        Logged in as
        <div>{userInfo?.name}</div>
        <div>{userInfo?.email}</div>
        <button className="account__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default AccountPage;
