import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints: (builder) => ({
        // * Get Genres
        getGenres: builder.query({
            query: () => {
                return `genre/movie/list?api_key=${tmdbApiKey}`
            }
        }),
        // * Get Movies by [Type]
        getMovies: builder.query({
            query: ({genreIdOrCategoryName, page, searchQuery}) => {
                // * Get Movies by category
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
                }
                // * Get Movies by genre
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
                }
                // * Search Movies
                if(searchQuery) {
                    return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
                }
                //  * Get Popular Movies
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`
            }
        }),
        getMovie: builder.query({
            query: ({id}) => {
                return `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
            }
        }),

        // * Get Favorited and Watchlisted Movies
        getList: builder.query({
            query: ({listName, accountId, sessionId, page}) => {
                return `account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`;
            }
        }),

        // * Get User Specific Lists
        getRecommendations: builder.query({
            query: ({movie_id, list}) => {
                return `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
            }
        }),
        // * Get Actor
        getActor: builder.query({
            query: ({id}) => {
                return `/person/${id}?api_key=${tmdbApiKey}`
            }
        }),

        // * Get Movies By Actor
        getMoviesByActor: builder.query({
            query: ({id, page}) => {
                return `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
            }
        })
    })
})

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery, useGetRecommendationsQuery, useGetActorQuery, useGetMoviesByActorQuery, useGetListQuery } = tmdbApi;
