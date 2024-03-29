import React from "react";
import DateTime from "../components/DateTime";
import Match from "../components/Match";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <ImgContainer>
        <img
          src="../../stadium.jpg"
          width={"40%"}
          height={"40%"}
          alt="stadium"
        />
      </ImgContainer>
      <DateStyle>
        <DateTime />
        <Match />
      </DateStyle>
    </>
  );
};

const ImgContainer = styled.div`
  text-align: center;
  background-color: black;
`;

const DateStyle = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export default Home;
