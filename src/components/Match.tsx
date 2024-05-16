import styled from "styled-components";
import { useData } from "../context/DataContext";
import NotFound from "./NotFound";

interface PlatformProps {
  platform: string;
}

const Match = () => {
  const { filteredData } = useData();
  const navigateLink = (url: string) => {
    if (!/^(http|https):\/\//.test(url)) {
      url = `https://${url}`;
    }
    window.open(url, "_blank");
  };

  return filteredData.length === 0 ? (
    <NotFound />
  ) : (
    <MathchStyle>
      {filteredData.map((item, idx) => (
        <MatchContainer key={idx} onClick={() => navigateLink(item.link)}>
          <Info>
            <Time>{item.time}</Time>
            <PlatformStyle platform={item.platform}>
              {item.platform.replace("아이엠그라운드", "아이엠\n그라운드")}
            </PlatformStyle>
          </Info>
          <h4></h4>
          <div>
            <MatchTitle>{item.title}</MatchTitle>
            <Item>
              <ItemList>
                <span
                  style={{
                    color:
                      item.sex === "남자"
                        ? "blue"
                        : item.sex === "여자"
                        ? "red"
                        : "#FFBB00",
                  }}
                >
                  •
                </span>
                {`${item.sex}•`}
              </ItemList>
              <ItemList>{item.level}</ItemList>
              <ItemList>•{item.matchType}</ItemList>
              <ItemList>•{item.matchChar}</ItemList>
            </Item>
          </div>
          <Info>
            <CountContainer>
              <Count>{item.curCount}</Count>
              <span>/</span>
              <Count>{item.maxCount}</Count>
            </CountContainer>
          </Info>
        </MatchContainer>
      ))}
    </MathchStyle>
  );
};

const MathchStyle = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const MatchContainer = styled.div`
  display: grid;
  width: 100%;
  padding: 0px 5px;

  grid-template-columns: 0.35fr 0fr 0.75fr 0.1fr;
  grid-gap: 10px;
  border-bottom: 0.3px solid;

  @media screen and (max-width: 768px) {
    margin-left: 4px;
    width: 100%;
    grid-gap: 10px;
    grid-template-columns: 0fr 0fr 0.95fr 0.15fr;
  }
`;

const Time = styled.h1`
  margin: auto;
  min-width: 60px;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const MatchTitle = styled.h4`
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Item = styled.div`
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ItemList = styled.span`
  border-radius: 8px;
  color: grey;

  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    font-size: 9px;
  }

  span {
    margin-right: 5px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 60px; /* Ensure consistent width */
`;

const Count = styled.div`
  text-align: right; /* Ensure alignment within the flex container */
  width: 20px; /* Set a fixed width for each count to maintain alignment */
`;

const PlatformStyle = styled.div<PlatformProps>`
  padding: 3px;
  border-radius: 5px;
  font-size: 12px;
  color: white;
  min-width: 50px;
  text-align: center;
  white-space: pre-wrap;
  @media screen and (max-width: 768px) {
    padding: 4px;
    min-width: 32px;
    font-size: 11px;
  }
  background-color: ${(props) => {
    switch (props.platform) {
      case "Plab":
        return "#6799FF";
      case "Puzzle":
        return "#86E57F";
      case "Iam":
        return "#F15F5F";
      case "With":
        return "#FFE400";
      default:
        return "grey";
    }
  }};
`;

export default Match;
