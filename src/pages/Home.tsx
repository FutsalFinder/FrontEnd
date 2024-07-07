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
          loading="lazy"
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
  width: 100%;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const DateStyle = styled.div`
  width: 80%;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export default Home;
