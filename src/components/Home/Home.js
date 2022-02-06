import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
// import movieApi from "../../common/apis/movieApi";
import { useDispatch } from "react-redux";
// import { addMovies } from '../../features/movies/movieSlice'
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice'



const Home = () => {
  const dispatch = useDispatch();

  const movieText = 'Harry';
  const showText = 'Friends'
  
  useEffect(() => {
    // const movieText = "Harry";

    // const fetchMovies = async () => {
      // const res = await movieApi
      //   .get(
      //     `?apiKey=${process.env.REACT_APP_OMDB_KEY}&s=${movieText}&type=movie`
      //   )
      //   .catch((err) => console.log("Error :", err));

      // dispatch(addMovies(res.data))
    // };

    // fetchMovies()
    dispatch(fetchAsyncMovies(movieText))
    dispatch(fetchAsyncShows(showText))
  }, [dispatch]);


  return (
    <>
      <div className="banner-img"></div>
      <MovieListing/>
      
    </>
  );
};

export default Home;
