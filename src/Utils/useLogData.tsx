import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase';

type Log = {
  date: Date;
  distance: number;
  gojekEarnings: number;
  grabEarnings: number;
  tadaEarnings: number;
  totalEarnings: number;
  rydeEarnings: number;
  id: number;
};

const useLogData = () => {
  const [user, loading, error] = useAuthState(auth);
  const [logData, setLogData] = useState<Array<Log>>([
    {
      date: new Date(),
      distance: 0,
      gojekEarnings: 0,
      grabEarnings: 0,
      tadaEarnings: 0,
      rydeEarnings: 0,
      totalEarnings: 0,
      id: 0,
    },
  ]);
  const navigate = useNavigate();

  const fetchLogData = async () => {
    try {
      const q1 = query(
        collection(db, 'users'),
        where('uid', '==', user && user.uid)
      );
      const doc = (await getDocs(q1)).docs[0];
      const id = doc.id;

      const q2 = query(collection(db, 'users/' + id + '/logs'));
      console.log((await getDocs(q2)).docs);
      const logData = (await getDocs(q2)).docs.map((doc, index) => ({
        ...doc.data(),
        date: new Date(doc.data().date),
        id: index,
      })) as Array<Log>;

      setLogData(logData);
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data!!!');
    }
  };
  useEffect(() => {
    if (loading) return console.info('Data is loading, please wait.');
    if (!user) return navigate('/');
    fetchLogData();
  }, [loading, user]);
  return logData;
};

export default useLogData;
