import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";


export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async () => {
    const movieText = "Harry";
    const res = await movieApi.get(`?apiKey=${process.env.REACT_APP_OMDB_KEY}&s=${movieText}&type=movie`);
    console.log({ res })
    return res.data
  }
);


export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async () => {
    const aeriesText = "Friends";
    const res = await movieApi.get(`?apiKey=${process.env.REACT_APP_OMDB_KEY}&s=${aeriesText}&type=series`);
    console.log({ series: res })
    return res.data
  }
);


export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${process.env.REACT_APP_OMDB_KEY}&i=${id}&Plot=full`);
    return response.data;
  }
);


const initialState = {
  movies: {},
  shows: {}
}

const movieSlice = createSlice({ 
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log('Pending')
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log('fetched successfully')
      return {...state, movies: payload }
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log('Rejected')
    },

    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log('fetched successfully')
      return {...state, shows: payload }
    },
    [fetchAsyncShows.pending]: () => {
      console.log('Fetching Shows Pending')
    },
    [fetchAsyncShows.rejected]: () => {
      console.log('Fetching Shows Rejected')
    },

    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, selectMovieOrShow: payload };
    },
  }

});


export const { addMovies, removeSelectedMovieOrShow } = movieSlice.actions;
;
export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;

export default movieSlice.reducer;