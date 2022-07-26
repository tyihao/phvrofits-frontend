import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../Firebase';

const useUsername = () => {
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const fetchUserName = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('uid', '==', user && user.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserName();
  });

  return name;
};

export default useUsername;
