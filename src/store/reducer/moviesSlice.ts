import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { RootState } from "../store";
import apiSlice from "../api/localApiSlice";

export interface MoviesState {
  id: number;
  title: number;
  director: string;
}

const moviesAdapter = createEntityAdapter<MoviesState>({
  selectId: (movies) => movies.id,
});

const initialState = moviesAdapter.getInitialState({});

const extendedAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => ({
        url: "movies",
      }),
      transformResponse: (response: MoviesState[]): MoviesState[] => response,
    }),
  }),
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
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
export const { useGetMoviesQuery } = extendedAuthApi;

// Selectors
const { selectById, selectAll } = moviesAdapter.getSelectors();

const any = (state: RootState) => state.movies;

export const SelectMovie = (id: number) =>
  createSelector(any, (state) => selectById(state, id));

export const SelectMovies = createSelector(any, (state) => selectAll(state));
