import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, fetchFuelLogData } from '../Firebase';
import { FuelLogInfo } from './types';

const useEarningsLogData = () => {
  const [user, loading] = useAuthState(auth);
  const [logData, setLogData] = useState<Array<FuelLogInfo>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading && user) return console.info('Data is loading, please wait.');
    if (!user) return navigate('/');

    const fetchData = async () => {
      const logData = await fetchFuelLogData();
      setLogData(logData || []);
    };

    fetchData().catch((err) => console.error(err));
  }, [loading, user, navigate]);

  return logData;
};

export default useEarningsLogData;
