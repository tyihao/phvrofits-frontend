import AddIcon from '@mui/icons-material/Add';
import HailIcon from '@mui/icons-material/Hail';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Box,
  Button,
  Container,
  Fab,
  MenuItem,
  Stack,
  SwipeableDrawer,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';

import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import './Styles/Navbar.css';
import useUserInfo from '../Utils/useUserInfo';
import { USER_PAGES, GENERAL_PAGES } from './constants';

function Navbar() {
  const theme = useTheme();
  const [user] = useAuthState(auth);
  const userInfo = useUserInfo();
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
    <AppBar
      position="static"
      sx={{
        padding: '10px 10px 10px 10px',
        backgroundColor: 'rgba(0,0,0,0)',
        color: theme.palette.primary.main,
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
              ? USER_PAGES.map((page) => (
                  <Link
                    key={page.pageName}
                    className="navbar-link-desktop"
                    to={`/${page.pageLink}`}
                  >
                    <MenuItem key={page.pageName} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        {page.pageName}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))
              : GENERAL_PAGES.map((page) => (
                  <Link
                    key={page.pageName}
                    className="navbar-link-desktop"
                    to={`/${page.pageLink}`}
                  >
                    <MenuItem key={page.pageName} onClick={handleCloseNavMenu}>
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
              {userInfo && (
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
              )}
              <Box sx={{ margin: 2 }}>
                {(user ? USER_PAGES : GENERAL_PAGES).map((page) => (
                  <Link
                    key={page.pageName}
                    className="navbar-link"
                    to={`/${page.pageLink}`}
                  >
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
                        <page.Icon sx={{ marginRight: 2 }} />
                        <Typography textAlign="center">
                          {page.pageName}
                        </Typography>
                      </>
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
                    backgroundColor: theme.palette.primary.main,
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
  );
}

export default Navbar;
