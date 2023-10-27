import {
  PayloadAction,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import apiSlice from "../api/localApiSlice";
import { RootState } from "../store";

export interface MoviesState {
  id: number;
  title: string;
  director: string;
}

const moviesAdapter = createEntityAdapter<MoviesState>({
  selectId: (movies) => movies.id,
});

const initialState = moviesAdapter.getInitialState<{
  selectedMovie?: MoviesState;
  movie?: number;
}>({
  selectedMovie: undefined,
  movie: undefined,
});

const extendedAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<Array<MoviesState>, void>({
      query: () => ({
        url: "movies",
      }),
      providesTags: ["movies"],
    }),
    getMovie: builder.query({
      query: (param) => ({
        url: `movies/${param}`,
      }),
      providesTags: ["movie"],
    }),
    setMovie: builder.mutation<MoviesState, Omit<MoviesState, "id">>({
      query: (body) => ({
        url: "movies",
        method: "POST",
        body,
      }),
      invalidatesTags: ["movies"],
    }),
    updateMovie: builder.mutation<MoviesState, MoviesState>({
      query: (body) => ({
        url: `movies/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["movies"],
    }),
    removeMovie: builder.mutation<{ message: string }, Pick<MoviesState, "id">>(
      {
        query: (body) => ({
          url: `movies/${body.id}`,
          method: "DELETE",
        }),
        transformResponse: (response: {
          message: string;
        }): { message: string } => response,
        invalidatesTags: ["movies"],
      }
    ),
  }),
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSelectedMovie: (state, { payload }: PayloadAction<MoviesState>) => {
      // ❌ ERROR: does not actually mutate or return anything new!
      // state.selectedMovie = payload;

      // ✅ CORRECT: returns a new value to replace the old one
      return {
        ...state,
        selectedMovie: payload,
      };
    },
    removeSelectedMovie: (state) => {
      // ✅ CORRECT: returns a new value to replace the old one
      return {
        ...state,
        selectedMovie: undefined,
      };
    },
    setMovie: (state, { payload }: PayloadAction<MoviesState>) => {
      // ❌ ERROR: does not actually mutate or return anything new!
      // state.movie = payload.id;

      // ✅ CORRECT: returns a new value to replace the old one
      return {
        ...state,
        movie: payload.id,
      };
    },
    removeMovie: (state) => {
      // ❌ ERROR: does not actually mutate or return anything new!
      // state.movie = undefined;

      // ✅ CORRECT: returns a new value to replace the old one
      return {
        ...state,
        movie: undefined,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      extendedAuthApi.endpoints.getMovies.matchFulfilled,
      (state, { payload }) => {
        moviesAdapter.setAll(state, payload);
      }
    );
  },
});

// Reducers
export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useLazyGetMovieQuery,
  useLazyGetMoviesQuery,
  useSetMovieMutation,
  useRemoveMovieMutation,
  useUpdateMovieMutation,
} = extendedAuthApi;

//Actions

export const { removeSelectedMovie, setSelectedMovie } = moviesSlice.actions;

// Selectors
const { selectById, selectAll } = moviesAdapter.getSelectors();

const any = (state: RootState) => state.movies;

export const selectMovieById = (id: number) =>
  createSelector(any, (state) => selectById(state, id));

export const selectMovies = createSelector(any, (state) => selectAll(state));

export const selectSelectedMovie = createSelector(
  any,
  (state) => state.selectedMovie
);
export const selectMovie = createSelector(any, (state) => state.movie);
