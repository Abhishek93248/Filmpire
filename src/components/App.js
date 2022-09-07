import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Actors, MovieInformation, Profile, Movies, NavBar } from './index';
import useStyles from './styles';
import useAlan from './Alan';

function App() {
  const classes = useStyles();
  const alanBtnContainer = useRef();
  useAlan();
  return (

    <div className={classes.root}>
      <CssBaseline />
      <NavBar />

      <main className={classes.content}>
        <div className={classes.toolbar}>
          <Routes>
            <Route exact path="/" element={<Movies />} />
            <Route exact path="/approved" element={<Movies />} />

            <Route exact path="/movie/:id" element={<MovieInformation />} />
            <Route exact path="/actors/:id" element={<Actors />} />

            <Route exact path="/profile/:id" element={<Profile />} />

          </Routes>

        </div>
        <div ref={alanBtnContainer} />

      </main>
    </div>
  );
}

export default App;
