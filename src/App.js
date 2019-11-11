import React, { useState, useEffect } from "react";
import "./stylesheets/App.css";
import "./stylesheets/normalize.css";
import Navbar from "./components/Navbar";
import {MDBContainer} from "mdbreact";
import {AppStyles} from "./stylesheets/styled";
import MovieLayout from "./components/MovieLayout";
import {withCookies} from "react-cookie";
import axios from "axios";

const App = ({cookies}) => {
  const [gotData, setGotData] = useState(cookies.get('token'));
  const [votes, setVotes] = useState(0);
  useEffect(() => {
    const fetchByCookies = async() => {
      await axios.get("http://localhost:9000/cookies", {
        token: cookies.get('token')
      }).then(res => {
        setGotData(false);
        setVotes(res[0].votes);
      })
    }
    if(gotData) {
      fetchByCookies()
    }
  })
  return (
    <AppStyles>
      <div className="toSpecialColor">
      <Navbar ></Navbar>
      <MDBContainer fluid className="color-apply px-5 pb-5"><MovieLayout votes={votes} cookies={cookies} /></MDBContainer>
      </div>
    </AppStyles>
  );
}

export default withCookies(App);
