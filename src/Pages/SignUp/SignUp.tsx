import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../../Firebase/firebase';
import './Styles/styles.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [petrolStation, setPetrolStation] = useState('');
  const [fuelGrade, setFuelGrade] = useState('');

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (
      [
        name,
        email,
        password,
        carModel,
        fuelEfficiency,
        petrolStation,
        fuelGrade,
      ].find((ele) => ele === '') !== undefined
    )
      alert('Incomplete form');
    else {
      registerWithEmailAndPassword(
        name,
        email,
        password,
        carModel,
        fuelEfficiency,
        petrolStation,
        fuelGrade
      );
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/dashboard');
  }, [user, loading, navigate]);

  return (
    <div className="register">
      <div className="register__container">
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Appleseed"
          className="register_input"
          required
          variant="standard"
          sx={{ marginBottom: '7px' }}
        />
        <TextField
          id="email"
          label="E-mail Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="abc@xyz.com"
          className="register_input"
          required
          sx={{ marginBottom: '7px' }}
          variant="standard"
        />
        <TextField
          id="password"
          variant="standard"
          label="Password"
          type="password"
          required
          className="register_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: '7px' }}
          placeholder="Password"
        />
        <TextField
          id="car-model"
          variant="standard"
          label="Car Model"
          required
          className="register_input"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          sx={{ marginBottom: '7px' }}
          placeholder="Mazda 3"
        />
        <TextField
          id="fuel-efficiency"
          variant="standard"
          label="Fuel Efficiency (Litre/100km)"
          required
          className="register_input"
          value={fuelEfficiency}
          onChange={(e) => setFuelEfficiency(e.target.value)}
          sx={{ marginBottom: '7px' }}
          placeholder="8.3"
        />
        <FormControl
          variant="standard"
          sx={{ marginTop: 5, marginBottom: '7px', textAlign: 'left' }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Petrol Station *
          </InputLabel>
          <Select
            variant="standard"
            required
            // labelId="petrol-station"
            // label="Petrol Station"
            value={petrolStation}
            onChange={(e: SelectChangeEvent<string>) =>
              setPetrolStation(e.target.value)
            }
          >
            <MenuItem value="caltex">Caltex</MenuItem>
            <MenuItem value="esso">Esso</MenuItem>
            <MenuItem value="shell">Shell</MenuItem>
            <MenuItem value="sinopec">Sinopec</MenuItem>
            <MenuItem value="spc">SPC</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ marginTop: 5, marginBottom: '20px', textAlign: 'left' }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Grade *
          </InputLabel>
          <Select
            variant="standard"
            required
            label="Fuel Grade"
            labelId="fuel-grade"
            value={fuelGrade}
            onChange={(e: SelectChangeEvent<string>) =>
              setFuelGrade(e.target.value)
            }
          >
            <MenuItem value="92">92</MenuItem>
            <MenuItem value="95">95</MenuItem>
            <MenuItem value="98">98</MenuItem>
            <MenuItem value="premium">Premium</MenuItem>
            <MenuItem value="diesel">Diesel</MenuItem>
          </Select>
        </FormControl>
        <Button className="register__btn" onClick={register} variant="outlined">
          Register
        </Button>
        <div>
          Already have an account? <Link to="/signin">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;
