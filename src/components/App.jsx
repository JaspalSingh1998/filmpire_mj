import React from 'react'
import { CssBaseline } from '@mui/material';
import {Routes, Route} from 'react-router-dom';

import { Actors, MovieInformation, Movies, NavBar, Profile } from './index';

function App() {
  return (
      <div>
        <CssBaseline />
        <main>
            <NavBar />
            <Routes>
                <Route exact path='/' element={<Movies />}/>
                <Route exact path='/movie/:id' element={<MovieInformation />}/>
                <Route exact path='/actors/:id' element={<Actors />}/>
                <Route exact path='/profile/:id' element={<Profile />}/>
            </Routes>
        </main>
      </div>
  )
}

export default App