import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';
import { Box, Typography, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let navigate = useNavigate();
  const {user} = useSelector(userSelector);
  const favouriteMovies = [];
  const logout = () => {
    localStorage.clear();
    navigate('/', {replace: true})
  }

  return (
    <Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' gutterBottom>My Profile</Typography>
        <Button color='inherit' onClick={logout}>Logout &nbsp; <ExitToApp /></Button>
      </Box>
      {!favouriteMovies.lenght ? (
        <Typography variant='h5'>Add Favourites or Watchlist some movies to see them here.</Typography>
      ) : (
        <Box>
          Favourite Movies
        </Box>
      )}
    </Box>
  )
}

export default Profile