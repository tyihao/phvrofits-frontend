import {
  NativeSelect,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { AccountSettingsData } from '../../../../Utils/types';

interface SettingsProps {
  settingsData: AccountSettingsData;
  handleSettingsData: (arg0: AccountSettingsData) => void;
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    display: 'block',
    borderRadius: 10,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '0px 26px 0px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    height: '40px',
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 10,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const Settings = (props: SettingsProps) => {
  const { settingsData, handleSettingsData } = props;

  return (
    <div>
      {/* Change name from 'Account' to 'Settings' when Profile Settings is completed */}
      <Typography variant="h5">Account</Typography>
      <Typography variant="caption" fontWeight={600}>
        Car model
      </Typography>
      <TextField
        required
        id="carModel"
        size="small"
        onChange={(e) =>
          handleSettingsData({
            ...settingsData,
            carModel: e.target.value,
          })
        }
        fullWidth
        type="string"
        value={settingsData.carModel || ''}
        placeholder={'Car brand and model name'}
        className="textfield"
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: '10px',
            marginBottom: '5px',
          },
        }}
      />
      <Typography variant="caption" fontWeight={600}>
        Fuel Efficiency
      </Typography>
      <TextField
        required
        id="Fuel efficiency"
        size="small"
        onChange={(e) =>
          handleSettingsData({
            ...settingsData,
            fuelEfficiency: e.target.value,
          })
        }
        fullWidth
        type="string"
        value={settingsData.fuelEfficiency || ''}
        placeholder={'Fuel efficiency (km/L)'}
        className="textfield"
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: '10px',
            marginBottom: '5px',
          },
        }}
      />
      <Typography variant="caption" fontWeight={600}>
        Smart Fuel Efficiency
      </Typography>
      <ToggleButtonGroup
        value={settingsData.fuelEfficiencyCalculationMethod}
        sx={{
          margin: 'auto',
          width: '100%',
          height: '40px',
          marginBottom: '5px',
        }}
        // TODO fix any type
        onChange={(e: any, value: any) =>
          handleSettingsData({
            ...settingsData,
            fuelEfficiencyCalculationMethod: value,
          })
        }
      >
        <ToggleButton value={'manual'}> Manual </ToggleButton>
        <ToggleButton value={'auto'}> Auto </ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="caption" fontWeight={600}>
        Fuel Grade
      </Typography>
      <NativeSelect
        id="fuel-grade"
        value={settingsData.fuelGrade}
        onClick={(e: any) =>
          handleSettingsData({
            ...settingsData,
            fuelGrade: e.target.value,
          })
        }
        input={<BootstrapInput />}
        sx={{
          margin: 'auto',
          width: '100%',
          marginBottom: '5px',
        }}
      >
        <option value="92">92</option>
        <option value="95">95</option>
        <option value="98">98</option>
        <option value="premium">Premium</option>
        <option value="diesel">Diesel</option>
      </NativeSelect>
      <Typography variant="caption" fontWeight={600}>
        Petrol Station
      </Typography>
      <NativeSelect
        id="petrol-station"
        value={settingsData.petrolStation}
        onClick={(e: any) =>
          handleSettingsData({
            ...settingsData,
            petrolStation: e.target.value,
          })
        }
        input={<BootstrapInput />}
        sx={{
          margin: 'auto',
          width: '100%',
          marginBottom: '5px',
        }}
      >
        <option value="caltex">Caltex</option>
        <option value="esso">Esso</option>
        <option value="shell">Shell</option>
        <option value="sinopec">Sinopec</option>
        <option value="spc">SPC</option>
      </NativeSelect>
    </div>
  );
};

export default Settings;
