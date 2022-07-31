import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../../Firebase/firebase';
import './Styles/styles.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [petrolStation, setPetrolStation] = useState('');

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(
      name,
      email,
      password,
      carModel,
      fuelEfficiency,
      petrolStation
    );
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/dashboard');
  }, [user, loading]);

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="carModel"
          className="register__textBox"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          placeholder="Car Model"
        />
        <input
          type="fuelEfficiency"
          className="register__textBox"
          value={fuelEfficiency}
          onChange={(e) => setFuelEfficiency(e.target.value)}
          placeholder="Fuel Efficiency"
        />
        <input
          type="petrolStation"
          className="register__textBox"
          value={petrolStation}
          onChange={(e) => setPetrolStation(e.target.value)}
          placeholder="Petrol Station"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <div>
          Already have an account? <Link to="/signin">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;
