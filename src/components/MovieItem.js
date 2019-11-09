import React from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBBtn,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardBody
} from "mdbreact";

const MovieItem = props => {
  return (
    <MDBCard>
      <MDBCardImage cascade style={{ height: '25rem' }} src={props.poster} top hover></MDBCardImage>
      <MDBCardBody className="stylish-color text-white">
        <MDBCardTitle tag="h5">{props.name}</MDBCardTitle>
        <MDBCardText className="secondary-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default MovieItem;
