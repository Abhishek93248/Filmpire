import React, { useState } from 'react';
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList, Pagination, FeaturedMovie } from '..';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 16 : 19;

  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" marginTop="20%">
        <CircularProgress size="4rem" />

      </Box>

    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name
          <br />
          Please search for something else

        </Typography>

      </Box>
    );
  }
  if (error) return 'An error has occured';
  return (
    <>
      <FeaturedMovie movie={data.results[0]} />
      <div><MovieList movies={data} numberOfMovies={numberOfMovies} /></div>
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </>
  );
}

export default Movies;
