import { useState } from 'react';
import FormHeader from './Components/FormHeader';
import LogFormToggle from './Components/LogFormToggle';
import SubmitEarningsLog from './Components/SubmitEarningsLog';
import SubmitFuelLog from './Components/SubmitFuelLog';
import './Styles/styles.css';

const SubmitLogPage = () => {
  const [logForm, setLogForm] = useState('earnings');

  const handleLogForm = (form: string) => {
    setLogForm(form);
  };

  return (
    <>
      <FormHeader />
      <LogFormToggle logForm={logForm} handleLogForm={handleLogForm} />
      {logForm === 'earnings' ? <SubmitEarningsLog /> : <SubmitFuelLog />}
    </>
  );
};

export default SubmitLogPage;
