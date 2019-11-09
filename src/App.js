import React from "react";
import "./stylesheets/App.css";
import "./stylesheets/normalize.css";
import Navbar from "./components/Navbar";
import {MDBContainer} from "mdbreact";
import {AppStyles} from "./stylesheets/styled";
import MovieLayout from "./components/MovieLayout";

function App() {
  return (
    <AppStyles>
      <div className="toSpecialColor">
      <Navbar></Navbar>
      <MDBContainer fluid className="color-apply px-5 pb-5"><MovieLayout /></MDBContainer>
      </div>
    </AppStyles>
  );
}

export default App;
