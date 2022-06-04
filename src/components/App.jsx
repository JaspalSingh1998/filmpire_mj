import React from 'react'
import { CssBaseline } from '@mui/material';
import {Routes, Route} from 'react-router-dom';

import { Actors, MovieInformation, Movies, NavBar, Profile } from './index';
import useStyles from './styles';

function App() {
  const classes = useStyles();  
  return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Routes>
                {["/", "/approved"].map(path => (
                  <Route exact path={path} element={<Movies />}/>
                ))}
                <Route exact path='/movie/:id' element={<MovieInformation />}/>
                <Route exact path='/actors/:id' element={<Actors />}/>
                <Route exact path='/profile/:id' element={<Profile />}/>
            </Routes>
        </main>
      </div>
  )
}

export default App