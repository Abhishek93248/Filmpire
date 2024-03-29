import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentCategoriesOrGenre';
import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';

function SideBar({ setMobileOpen }) {
  const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
  const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);

  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="Filmpire logo"
        />

      </Link>
      <Divider />
      <List>
        <ListSubheader>Categoires</ListSubheader>
        {
            categories.map(({ label, value }) => (
              <Link key={value} className={classes.link} to="/">
                <ListItem onClick={() => { dispatch(selectGenreOrCategory(value)); }} button>
                  <ListItemIcon>
                    <img src={genreIcons[label.toLowerCase()]} className={classes.genreImage} height={30} />
                  </ListItemIcon>
                  <ListItemText primary={label} />

                </ListItem>
              </Link>

            ))
        }
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />

          </Box>

        )
          : (
            data.genres.map(({ name, id }) => (
              <Link key={name} className={classes.link} to="/">
                <ListItem onClick={() => { dispatch(selectGenreOrCategory(id)); }} button>
                  <ListItemIcon>
                    <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
                  </ListItemIcon>
                  <ListItemText primary={name} />

                </ListItem>
              </Link>

            ))
          )}
      </List>

    </>

  );
}

export default SideBar;
