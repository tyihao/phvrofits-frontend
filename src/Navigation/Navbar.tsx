import { ThemeProvider } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import HailIcon from '@mui/icons-material/Hail';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  Fab,
  MenuItem,
  Stack,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableViewIcon from '@mui/icons-material/TableView';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import '../Styles/Navbar.css';
import useUserInfo from '../Utils/useUserInfo';

const user_pages = [
  { pageName: 'Home', pageLink: '', Icon: HomeIcon },
  { pageName: 'Dashboard', pageLink: 'dashboard', Icon: DashboardIcon },
  { pageName: 'Logs', pageLink: 'loglist', Icon: TableViewIcon },
  { pageName: 'Submit', pageLink: 'submit', Icon: ReceiptLongIcon },
  { pageName: 'Account', pageLink: 'account', Icon: AccountBoxIcon },
];

const general_pages = [
  { pageName: 'Home', pageLink: '' },
  { pageName: 'About', pageLink: 'about' },
  { pageName: 'Login', pageLink: 'signin' },
  { pageName: 'Register', pageLink: 'signup' },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#0971f1',
    },
  },
});

function Navbar() {
  const userInfo = useUserInfo();
  const [user, loading] = useAuthState(auth);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          padding: '10px 10px 10px 10px',
          backgroundColor: 'rgba(0,0,0,0)',
          color: '#2c5491',
          boxShadow: 0,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <HailIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              PHVrofits
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {user
                ? user_pages.map((page) => (
                    <Link
                      className="navbar-link-desktop"
                      to={`/${page.pageLink}`}
                    >
                      <MenuItem
                        key={page.pageName}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">
                          {page.pageName}
                        </Typography>
                      </MenuItem>
                    </Link>
                  ))
                : general_pages.map((page) => (
                    <Link
                      className="navbar-link-desktop"
                      to={`/${page.pageLink}`}
                    >
                      <MenuItem
                        key={page.pageName}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">
                          {page.pageName}
                        </Typography>
                      </MenuItem>
                    </Link>
                  ))}
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <Fab
                onClick={handleOpenNavMenu}
                size="medium"
                aria-label="add"
                sx={{
                  padding: '8px',
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
                }}
              >
                <MenuIcon />
              </Fab>
              <SwipeableDrawer
                id="menu-appbar"
                open={Boolean(anchorElNav)}
                onOpen={handleOpenNavMenu}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  height: 10,
                }}
              >
                <Box
                  sx={{
                    height: '100px',
                    padding: 3,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    color: 'white',
                    backgroundImage:
                      'url(https://img.freepik.com/premium-vector/abstract-global-network-connection-background_46250-2147.jpg)',
                  }}
                >
                  <Stack>
                    <Avatar alt={userInfo.name} />
                    <Typography
                      sx={{ marginTop: 2, fontWeight: 600, fontSize: 19 }}
                    >
                      {userInfo.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: 14 }}>
                      {userInfo.email} | {userInfo.carModel}
                    </Typography>
                  </Stack>
                </Box>
                <Box sx={{ margin: 2 }}>
                  {user
                    ? user_pages.map((page) => (
                        <Link className="navbar-link" to={`/${page.pageLink}`}>
                          <MenuItem
                            key={page.pageName}
                            onClick={handleCloseNavMenu}
                            sx={{
                              borderRadius: 2,
                              backgroundColor:
                                page.pageLink === location.split('/')[1]
                                  ? 'rgba(145,105,44,0.3)'
                                  : '',
                            }}
                          >
                            <>
                              {<page.Icon sx={{ marginRight: 2 }} />}
                              <Typography textAlign="center">
                                {page.pageName}
                              </Typography>
                            </>
                          </MenuItem>
                        </Link>
                      ))
                    : general_pages.map((page) => (
                        <Link className="navbar-link" to={`/${page.pageLink}`}>
                          <MenuItem
                            key={page.pageName}
                            onClick={handleCloseNavMenu}
                          >
                            <Typography textAlign="center">
                              {page.pageName}
                            </Typography>
                          </MenuItem>
                        </Link>
                      ))}
                </Box>
              </SwipeableDrawer>
            </Box>
            <HailIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '1.3rem',
              }}
            >
              PHVrofits
            </Typography>
            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Link className="navbar-link" to={`/submit`}>
                  <Fab
                    aria-label="add"
                    size="medium"
                    sx={{
                      padding: '8px',
                      backgroundColor: '#2c5491',
                      borderRadius: '15px',
                      boxShadow: `rgba(149, 157, 165, 0.5) 0px 8px 24px`,
                      color: 'white',
                    }}
                  >
                    <AddIcon />
                  </Fab>
                </Link>
              </Box>
            ) : (
              <Button
                sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                color="inherit"
                onClick={() => navigate('/signin')}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
