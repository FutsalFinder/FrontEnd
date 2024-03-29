import React from "react";
import styled from "styled-components";
import { useData } from "../context/DataContext";

const Match = () => {
  const { filteredData } = useData();
  return (
    <MathchStyle>
      {filteredData.map((item, idx) => (
        <MatchContainer key={idx}>
          <Title>{item.time}</Title>
          <h4></h4>
          <div>
            <h4>{item.title}</h4>
            <Item>
              <ItemList>{item.sex}</ItemList>
              <ItemList>{item.level}</ItemList>
              <ItemList>{item.matchType}</ItemList>
              <ItemList>{item.matchChar}</ItemList>
            </Item>
          </div>
          <Info>
            <div>{`${item.curCount}/${item.maxCount}`}</div>
            <div>{item.platform}</div>
          </Info>
        </MatchContainer>
      ))}
    </MathchStyle>
  );
};

const MathchStyle = styled.div`
  width: 60%;
  margin: auto;
  text-align: center;
`;

const MatchContainer = styled.div`
  display: grid;
  width: 100%;
  padding: 5px;
  grid-template-columns: 0.2fr 0.1fr 0.4fr 0.2fr;
  border-bottom: 0.3px solid;
`;
const Title = styled.h1`
  margin: auto;
`;

const Item = styled.div`
  margin: 10px;
`;

const ItemList = styled.span`
  border: 0.5px solid;
  border-radius: 8px;
  color: white;
  padding: 4px;
  background-color: grey;
`;

const Info = styled.div`
  display: flex;
  gap: 10px;
  margin: auto;
`;

export default Match;
