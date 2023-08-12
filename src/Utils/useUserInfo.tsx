import { collection, getDocs, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase';
import { UserInfo } from './types';

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const fetchUserName = useCallback(async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('uid', '==', user && user.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data() as UserInfo;
      setUserInfo(data);
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    if (loading && user) return console.info('Data is loading, please wait.');
    if (user) fetchUserName();
  }, [fetchUserName, loading, navigate, user]);

  return userInfo;
};

export default useUserInfo;
