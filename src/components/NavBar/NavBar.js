import React, { useEffect, useState, useContext } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';
import { SideBar, Search } from '..';
import { fetchToken, createSessionId, movieApi } from '../../utils/index';
import useStyles from './styles';
import { ColorModeContext } from '../../utils/ToggleColor';

function NavBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  const { isAuthenticated, user } = useSelector(userSelector);

  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await movieApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await movieApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {
        isMobile && (
        <IconButton
          color="inherit"
          edge="start"
          style={{ outlined: 'none' }}
          onClick={() => setMobileOpen((prevState) => !prevState)}
          className={classes.menuButton}
        >
          <Menu />

        </IconButton>
        )
      }
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {
            theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />
          }
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>

            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp; </>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar?.avatar_path}`}
                />
              </Button>

            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>

      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (

            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevState) => !prevState)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>

          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>

          )}

        </nav>

      </div>
    </>

  );
}

export default NavBar;
