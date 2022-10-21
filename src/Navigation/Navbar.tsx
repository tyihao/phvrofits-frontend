import { ThemeProvider } from '@emotion/react';
import HailIcon from '@mui/icons-material/Hail';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  createTheme,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import '../Styles/Navbar.css';
import useUsername from '../Utils/useUsername';

const user_pages = [
  { pageName: 'Home', pageLink: '' },
  { pageName: 'Dashboard', pageLink: 'dashboard' },
  { pageName: 'Log List', pageLink: 'loglist' },
  { pageName: 'Submit Log', pageLink: 'submit' },
  { pageName: 'Account', pageLink: 'account' },
];

const general_pages = [
  { pageName: 'Home', pageLink: '' },
  { pageName: 'About', pageLink: 'about' },
  { pageName: 'Login', pageLink: 'signin' },
  { pageName: 'Register', pageLink: 'signup' },
];

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

function Navbar() {
  const name = useUsername();
  const [user, loading] = useAuthState(auth);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

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
          padding: '20px 10px 10px 10px',
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
              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {user
                  ? user_pages.map((page) => (
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
              </Menu> */}
              <SwipeableDrawer
                id="menu-appbar"
                // anchorEl={anchorElNav}
                // anchorOrigin={{
                //   vertical: 'bottom',
                //   horizontal: 'left',
                // }}
                keepMounted
                // transformOrigin={{
                //   vertical: 'top',
                //   horizontal: 'left',
                // }}
                open={Boolean(anchorElNav)}
                onOpen={handleOpenNavMenu}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {user
                  ? user_pages.map((page) => (
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
                {/* <Tooltip title="Open settings">
                  <Link className="navbar-link" to={`/account`}>
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt={name} src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Link>
                </Tooltip> */}
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
