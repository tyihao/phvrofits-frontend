import React from 'react';
import workInProgress from './work-in-progress.png';

const Home = () => {
  return (
    <div
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
};

export default Home;
