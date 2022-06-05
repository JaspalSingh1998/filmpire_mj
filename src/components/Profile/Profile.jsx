import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';
import { Box, Typography, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useGetListQuery } from '../../services/TMDB';

import {RatedCards} from '..';

const Profile = () => {
  let navigate = useNavigate();
  const {user} = useSelector(userSelector);

  const {data: favoriteMovies, refetch: refetchFavorites} = useGetListQuery({listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});
  const {data: watchListedMovies, refetch: refetchWatchlisted} = useGetListQuery({listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  })

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
      {!favoriteMovies?.results?.length && !watchListedMovies?.results?.length? (
        <Typography variant='h5'>Add Favourites or Watchlist some movies to see them here.</Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies}/>
          <RatedCards title="Watchlist" data={watchListedMovies}/>
        </Box>
      )}
    </Box>
  )
}

export default Profile