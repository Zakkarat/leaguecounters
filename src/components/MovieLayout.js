import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import {
  MDBCol,
  MDBRow,
} from "mdbreact";
import {connect} from 'react-redux';
const MovieLayout = ({urlReducer,filters}) => {
  console.log(filters)
  const {language} = urlReducer;
  const {sort, searchWord, roles} = filters;
  const [championList, setChampionList] = useState([]);
  useEffect(() => {
    const fetchData = async () =>
      await axios(
        `http://ddragon.leagueoflegends.com/cdn/9.22.1/data/${language}/champion.json`
      )
        .then(({data}) => {
          data = data.data;
          const champs = Object.keys(data).reduce((row, elem, i) => {
                row.push(data[elem]);
                return row;
            }, [])
            if(sort === "ASC ↑") {
              setChampionList(champs.reverse())
            } else {
              setChampionList(champs)
            }
        })
        .catch(err => {
          console.log(err);
        });
    fetchData();
    console.log(sort === "ASC ↑")

  }, [language, sort]);
  console.log(championList)
  return (
    <MDBRow >
      {championList ?
        championList.map(card => (
                <MDBCol key={card.key} className="mt-4 mb-4 mx-auto d-flex justify-content-center">
                <MovieItem
                  name={card.name}
                  title={card.title}
                  desc={card.tags}
                  language={language}
                  poster={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${card.id}_0.jpg`}
                ></MovieItem>
                </MDBCol>
              ))
        : null}
    </MDBRow>
  );
};

const mapStateToProps = ({urlReducer, filters}) => ({
  urlReducer,
  filters
});

export default connect(mapStateToProps)(MovieLayout);
