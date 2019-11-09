import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import {
  MDBCol,
  MDBRow,
} from "mdbreact";
import {connect} from 'react-redux';
const MovieLayout = ({language}) => {
  console.log(`Main menu ${language}`)
  const [championList, setChampionList] = useState([]);
  useEffect(() => {
    const fetchData = async () =>
      await axios(
        `http://ddragon.leagueoflegends.com/cdn/9.22.1/data/${language}/champion.json`
      )
        .then(({data}) => {
          data = data.data;
          setChampionList(
              Object.keys(data).reduce((row, elem, i) => {
              if (i % 6 === 0) {
                row.push([data[elem]]);
                return row;
              } else {
                row[row.length - 1].push(data[elem]);
                return row;
              }
            }, [])
          );
        })
        .catch(err => {
          console.log(err);
        });
    fetchData();
  }, [language]);
  console.log(championList)
  return (
    <>
      {championList
        ? championList.map((group, index) => (
            <MDBRow key={index} className="">
              {group.map((card) => (
                <MDBCol className="mt-4 mb-4 mx-auto" xs='1'>
                <MovieItem
                  key={card.key}
                  name={card.name}
                  title={card.title}
                  desc={card.tags}
                  language={language}
                  poster={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${card.id}_0.jpg`}
                ></MovieItem>
                </MDBCol>
              ))}
              </MDBRow>
          ))
        : null}
    </>
  );
};

const mapStateToProps = ({language}) => ({
  language
});

export default connect(mapStateToProps)(MovieLayout);
