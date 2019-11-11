import React, { useState } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBCardBody,
  MDBBtn
} from "mdbreact";
import { voting } from "../Redux/actions";
import { connect } from "react-redux";
import axios from "axios";
import crypto from 'crypto';
const MovieItem = props => {
  const {cookies} = props;
  const [counter, setCounter] = useState(props.counter ? props.counter : 0);
  const sendCookies = async(votes) => {
    await axios.post("http://localhost:9000/cookies", {
      token: 'kek',
      votes
    }).then(res => console.log(res));
  }
  const handleClick = e => {
    if (props.votes > 0) {
      props.voting(props.votes - 1);
      setCounter(counter + 1);
      if(!cookies.get('token')) {
        cookies.set('token', crypto.randomBytes(16).toString('base64'));
      }
      sendCookies(props.votes - 1)
      axios
        .post("http://localhost:9000/counters", {
          id: props.id,
          Count: counter
        })
        .then(res => console.log(res));
    }

  };
  return (
    <MDBCard style={{ width: "16rem" }}>
      <MDBCardImage
        style={{ height: "28rem", transform: "scale(1.08)" }}
        src={props.poster}
        top
        hover
        waves={false}
      ></MDBCardImage>
      <MDBCardBody className="color-to-card text-white">
        <MDBCardTitle tag="h5" className="mb-0 text-center">
          <strong>{props.name}</strong>
        </MDBCardTitle>
        <p className="font-weight-bold secondary-text text-center mb-0">
          {props.title}
        </p>
        <MDBCardText className="mt-1 text-center">
          {props.language === "en_US" ? "Roles" : "Роли"}:{" "}
          {props.desc.join(", ")}
        </MDBCardText>
        <MDBBtn className="ml-5" onClick={handleClick}>
          Heh
        </MDBBtn>
        <p className="font-weight-bold secondary-text text-center mb-0">
          Votes for champion: {counter}
        </p>
      </MDBCardBody>
    </MDBCard>
  );
};

const mapStateToProps = ({ votes }) => ({
  votes
});

const mapDispatchToProps = {
  voting
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieItem);
