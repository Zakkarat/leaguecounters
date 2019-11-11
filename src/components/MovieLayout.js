import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import { MDBCol, MDBRow } from "mdbreact";
import { connect } from "react-redux";
import {voting} from '../Redux/actions'

const MovieLayout = ({ urlReducer, filters, cookies, votes }) => {
  const { language } = urlReducer;
  const { sort, searchWord, roles } = filters;
  const [championList, setChampionList] = useState([]);
  const [counters, setCounters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios('http://localhost:9000/counters').then(({data}) => {
        setCounters(data);
      })
      await axios(
        `http://ddragon.leagueoflegends.com/cdn/9.22.1/data/${language}/champion.json`
      )
        .then(({ data }) => {
          data = data.data;
          let champs = Object.keys(data).reduce((row, elem, i) => {
            row.push(data[elem]);
            return row;
          }, []);
          if (sort === "DESC ↓") {
            champs.reverse();
          }
          setChampionList(champs);
        })
        .catch(err => {
          console.log(err);
        }) 
      };
    fetchData();
  }, [language, sort]);
  const filterCheck = () => {
    let data = championList;
    if (roles.length !== 0) {
      data = data.filter(elem =>
        elem.tags.every(role => roles.indexOf(role) + 1)
      );
    }
    if (searchWord) {
      data = data.filter(elem => {
        return elem.name.match(new RegExp(searchWord, "ig"));
      });
    }
    return mergeCounters(data);
  };
  const mergeCounters = data => {
    console.log(counters)
    data.forEach(elem => {
      counters.forEach(count => {
        if(elem.key === count.key.toString()) {
          Object.assign(elem, count);
        }
      })
    });
    return data
  };
  return (
    <MDBRow>
      {championList
        ? filterCheck(championList).map(card => (
            <MDBCol
              key={card.key}
              className="mt-4 mb-4 mx-auto d-flex justify-content-center"
            >
              <MovieItem
                id={card.key}
                name={card.name}
                title={card.title}
                desc={card.tags}
                language={language}
                counter={card.counter}
                cookies={cookies}
                poster={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${card.id}_0.jpg`}
              ></MovieItem>
            </MDBCol>
          ))
        : null}
    </MDBRow>
  );
};

const mapStateToProps = ({ urlReducer, filters }) => ({
  urlReducer,
  filters
});

const mapDispatchToProps = {
  voting
}
export default connect(mapStateToProps)(MovieLayout);
