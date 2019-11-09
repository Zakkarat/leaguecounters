import React from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBCardBody
} from "mdbreact";

const MovieItem = props => {
  return (
    <MDBCard style={{ width: "16rem" }}>
      <MDBCardImage style={{ height: '28rem', transform: 'scale(1.08)' }} src={props.poster} top hover waves={false}></MDBCardImage>
      <MDBCardBody className="color-to-card text-white">
        <MDBCardTitle tag="h5" className="mb-0 text-center"><strong>{props.name}</strong></MDBCardTitle>
        <p className='font-weight-bold secondary-text text-center mb-0'>{props.title}</p>
        <MDBCardText className="mt-1 text-center">{props.language === "en_US" ? "Roles" : "Роли"}: {props.desc.join(', ')}</MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default MovieItem;
