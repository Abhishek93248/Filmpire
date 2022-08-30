import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/styles';
import { Link } from 'react-router-dom';
import { SideBar } from '..';
import useStyles from './styles';

function NavBar() {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;
  const [mobileOpen, setMobileOpen] = useState(false);
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
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {
            theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />
          }
          </IconButton>
          {!isMobile && 'Search...'}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>

            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/profile/:id"
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp; </>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
                />
              </Button>

            )}
          </div>
          {isMobile && 'Search...'}
        </Toolbar>

      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (

            <Drawer
              variant="temporary"
              anchor="right"
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
