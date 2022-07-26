import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './Styles/styles.css';
import { auth, db, logout } from '../../../Firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

type Log = {
  date: Date;
  distance: number;
  gojekEarnings: number;
  grabEarnings: number;
  tadaEarnings: number;
  totalEarnings: number;
};

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const [logs, setLogs] = useState<Array<Log>>();
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q1 = query(
        collection(db, 'users'),
        where('uid', '==', user && user.uid)
      );
      const doc = (await getDocs(q1)).docs[0];
      const data = doc.data();
      const id = doc.id;
      setName(data.name);

      const q2 = query(collection(db, 'users/' + id + '/logs'));
      const logData = (await getDocs(q2)).docs.map((doc) => ({
        ...doc.data(),
        date: new Date(doc.data().date),
      })) as Array<Log>;

      setLogs(logData);
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };
  console.log({ loading });
  useEffect(() => {
    if (loading) return console.log('loading!');
    if (!user) return navigate('/');
    fetchUserName();
  }, [user, loading]);

  console.log(logs);
  return (
    <>
      <div className="dashboard">
        <div className="dashboard__container">
          My Gojek Earnings:
          {logs && logs.map((log) => <> {log.gojekEarnings} </>)}
          <br />
          My Grab Earnings:
          {logs && logs.map((log) => <> {log.grabEarnings} </>)}
          <br />
          My Tada Earnings:{' '}
          {logs && logs.map((log) => <> {log.tadaEarnings} </>)}
          <br />
          My Total Earnings:{' '}
          {logs && logs.map((log) => <> {log.totalEarnings} </>)}
          <br />
          My Dates: {logs && logs.map((log) => <> {log.date.getDate()} </>)}
          <br />
          Logged in as
          <div>{name}</div>
          <div>{user && user.email}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
