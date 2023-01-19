import { collection, getDocs, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase';
import { LogInfo } from './types';

const useLogData = () => {
  const [user, loading] = useAuthState(auth);
  const [logData, setLogData] = useState<Array<LogInfo>>([]);
  const navigate = useNavigate();

  const fetchLogData = useCallback(async () => {
    try {
      const q1 = query(
        collection(db, 'users'),
        where('uid', '==', user && user.uid)
      );
      const doc = (await getDocs(q1)).docs[0];
      const id = doc.id;

      const q2 = query(collection(db, 'users/' + id + '/logs'));
      const logData = (await getDocs(q2)).docs.map((doc) => ({
        ...doc.data(),
        date: new Date(doc.data().date),
        id: doc.id,
      })) as Array<LogInfo>;
      setLogData(logData);
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data!');
    }
  }, [user]);

  useEffect(() => {
    if (loading) return console.info('Data is loading, please wait.');
    if (!user) return navigate('/');
    fetchLogData();
  }, [loading, user]);

  return logData;
};

export default useLogData;
