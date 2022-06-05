import React, {useEffect} from 'react'
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material'
import {Link} from 'react-router-dom'
import { useTheme } from '@mui/styles';

import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import genreIcons from '../../assets/genres';

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
    {label: 'Popular', value: 'popular'},
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Upcoming', value: 'upcoming'},
];

const Sidebar = ({setMobileOpen}) => {
  const {genreIdOrCategoryName} = useSelector((state) => state.currentGenreOrCategory);
  const theme = useTheme();
  const classes = useStyles();  
  const {data, error, isFetching} = useGetGenresQuery();
  const dispatch = useDispatch();

  useEffect(() => {
      setMobileOpen(false);
  }, [genreIdOrCategoryName]);
  return (
      <>
        <Link to='/' className={classes.imageLink}>
            <img 
                className={classes.image}
                src={theme.palette.mode === 'light' ? redLogo : blueLogo}
                alt="Filmpire Logo"
            />
        </Link>
        <Divider />
        <List>
            <ListSubheader>Categories</ListSubheader>
            {categories.map(({label, value}) => (
                <Link key={value} className={classes.links} to="/">
                    <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
                        <ListItemIcon>
                            <img src={genreIcons[label.toLowerCase()]} alt="GenreImage" className={classes.genreImages} height={30}/>
                        </ListItemIcon>
                        <ListItemText primary={label}/>
                    </ListItem>
                </Link>
            ))}
        </List>
        <Divider />
        <List>
            <ListSubheader>Geners</ListSubheader>
            {isFetching ? (
                <Box display='flex' justifyContent='center'>
                    <CircularProgress />
                </Box>) 
                : (data.genres.map(({id, name}) => (
                <Link key={id} className={classes.links} to="/">
                    <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                        <ListItemIcon>
                            <img src={genreIcons[name.toLowerCase()]} alt="GenreImage" className={classes.genreImages} height={30}/>
                        </ListItemIcon>
                        <ListItemText primary={name}/>
                    </ListItem>
                </Link>
            )))}
        </List>
      </>
  )
}

export default Sidebar