import { Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../../../Firebase';
import { AccountProfileData, AccountSettingsData } from '../../../Utils/types';
import useUserInfo from '../../../Utils/useUserInfo';
import LogOutButton from './Components/LogOutButton';
import Profile from './Components/Profile';
import SaveButton from './Components/SaveButton';
import Settings from './Components/Settings';
import './Styles/styles.css';

const AccountPage = () => {
  const userData = useUserInfo();
  const [profileData, setProfileData] = useState<AccountProfileData>({
    name: '',
    email: '',
  });
  const [settingsData, setSettingsData] = useState<AccountSettingsData>({
    carModel: '',
    fuelEfficiency: '',
    fuelEfficiencyCalculationMethod: 'manual',
    fuelGrade: '',
    petrolStation: '',
  });
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  // Update local state if user data changes
  useEffect(() => {
    userData &&
      setSettingsData({
        carModel: userData.carModel,
        fuelEfficiency: userData.fuelEfficiency,
        fuelEfficiencyCalculationMethod:
          userData.fuelEfficiencyCalculationMethod,
        fuelGrade: userData.fuelGrade,
        petrolStation: userData.petrolStation,
      });

    userData &&
      setProfileData({
        email: userData.email,
        name: userData.name,
      });
  }, [userData]);

  const handleSettingsData = (data: AccountSettingsData) => {
    setSettingsData(data);
  };

  return (
    <div className="account">
      <Grid container direction="column" columnSpacing={1}>
        {/* TODO Add Profile Settings */}
        {/* <Grid item>
          <Typography variant="h3">Account</Typography>
        </Grid> */}
        {/* <Divider sx={{ borderWidth: '1px' }} /> */}
        {/* <Grid item>
          <Profile />
        </Grid> */}
        {/* <Divider /> */}
        <Grid item>
          <Settings
            settingsData={settingsData}
            handleSettingsData={handleSettingsData}
          />
        </Grid>
        <Grid item container direction="row">
          <Grid item>
            <SaveButton />
          </Grid>
          <Grid item>
            <LogOutButton handleLogout={logout} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default AccountPage;
