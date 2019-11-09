import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import {
  MDBCardGroup,
  MDBCol,
  MDBRow,
  MDBPagination,
  MDBPageNav,
  MDBPageItem
} from "mdbreact";
//const top_rated = `https://api.themoviedb.org/3/movie/top_rated?api_key=6326e1c1e6c5ba7ae501aec76981e034&language=en-US&page=1`
const lol = `http://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US/champion.json`;
//const childish = `https://api.themoviedb.org/3/discover/movie?api_key=6326e1c1e6c5ba7ae501aec76981e034&certification_country=US&certification.lte=G&sort_by=popularity.desc&page=1`
const MovieLayout = () => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const pagesRange = Array(5).reduce((acc, elem, i) => {
    if(i === 0) {
        acc.push(page);
        return acc;
    }
    acc.push(page + i);
    return acc;
  },[])
  console.log(pagesRange);
  useEffect(() => {
    const fetchData = async () =>
      await axios(
        lol
      )
        .then(res => {
          console.log(res);
          setMovieList(
            res.data.results.reduce((row, elem, i) => {
              if (i % 5 === 0) {
                row.push([elem]);
                return row;
              } else {
                row[row.length - 1].push(elem);
                return row;
              }
            }, [])
          );
        })
        .catch(err => {
          console.log(err);
        });
    fetchData();
  }, []);
  return (
    <>
      {movieList
        ? movieList.map((group, index) => (
            <MDBCardGroup deck className="mt-4 mb-4" key={index}>
              {group.map((card, i) => (
                <MovieItem
                  key={i}
                  name={card.original_title}
                  poster={`https://image.tmdb.org/t/p/w300${card.poster_path}`}
                ></MovieItem>
              ))}
            </MDBCardGroup>
          ))
        : null}
    </>
  );
};

export default MovieLayout;
