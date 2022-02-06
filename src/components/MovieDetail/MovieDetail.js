import React, { useEffect } from "react";
import "./MovieDetail.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovieOrShowDetail,
  getSelectedMovieOrShow,
  removeSelectedMovieOrShow,
} from "../../features/movies/movieSlice";
import { ClipLoader, DotLoader, FadeLoader } from 'react-spinners';
// import { css } from 'react-emotion';


// const loaderCSS = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;


const MovieDetail = () => {
  const { imdbID } = useParams();
  // console.log(imdbID);

  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovieOrShow);
  // console.log(data);

  const loading = useSelector(
    (state) => state.movies.selectMovieOrShow.loading
  );
  // console.log({ loading });


  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);

  return (
    <div className="movie-section">
      {loading === "pending" && 
        <FadeLoader
        // className={loaderCSS}
          sizeUnit={"px"}
          size={150}
          // color={'#123abc'}
          color={'#79b8f3'}
          loading={true}
      />
      }

      {loading === "rejected" && <div>...Rejected</div>}

      {loading === "fulfilled" && (
        <>
          <div className="section-left">
            <div className="movie-title">{data.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Rating <i className="fa fa-star"></i> : {data.imdbRating}
              </span>
              <span>
                IMDB Votes <i className="fa fa-thumbs-up"></i> :{" "}
                {data.imdbVotes}
              </span>
              <span>
                Runtime <i className="fa fa-film"></i> : {data.Runtime}
              </span>
              <span>
                Year <i className="fa fa-calendar"></i> : {data.Year}
              </span>
            </div>
            <div className="movie-plot">{data.Plot}</div>

            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{data.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{data.Actors}</span>
              </div>
              <div>
                <span>Generes</span>
                <span>{data.Genre}</span>
              </div>
              <div>
                <span>Languages</span>
                <span>{data.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{data.Awards}</span>
              </div>
            </div>
          </div>

          <div className="section-right">
            <img src={data.Poster} alt={data.Title} />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
