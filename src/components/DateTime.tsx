import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useData } from "../context/DataContext";

interface ClickableDateProps {
  isSelected: boolean;
}

const DateTime: React.FC = () => {
  const today: Date = new Date();
  const dates: string[] = [];
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const { handleRegionChange, handleSexChange, handlePlatformChange } =
    useData();

  const handleDateClick = (index: number) => {
    setSelectedDate(index);
  };
  // 1주일 후까지의 날짜를 계산하여 dates 배열에 추가합니다.
  for (let i = 0; i < 7; i++) {
    const date: Date = new Date(today);
    date.setDate(today.getDate() + i);
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    dates.push(`${month}/${day}`);
  }

  return (
    <>
      <DateHead>
        <h3>날짜 선택</h3>
        <div>
          <Selection onChange={(e) => handleRegionChange(e.target.value)}>
            <option value="">지역 보기</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
            <option value="그 외">그 외</option>
          </Selection>
          <Selection onChange={(e) => handleSexChange(e.target.value)}>
            <option value="">성별</option>
            <option value="혼성">혼성</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </Selection>
          <Selection onChange={(e) => handlePlatformChange(e.target.value)}>
            <option value="">플랫폼</option>
            <option value="플랩">플랩</option>
            <option value="퍼즐">퍼즐</option>
            <option value="아이엠">아이엠</option>
            <option value="위드">위드</option>
          </Selection>
        </div>
      </DateHead>
      <DateContainer>
        <Button text={"<"} size="20px" color="white" border="none" />

        {dates.map((dateString, index) => (
          <div key={index}>
            <ClickDate
              onClick={() => handleDateClick(index)}
              isSelected={selectedDate === index}
            >
              {
                <Button
                  text={dateString}
                  size="16px"
                  color="white"
                  border="none"
                  borderRadius="20px"
                />
              }
            </ClickDate>
          </div>
        ))}

        <Button text={">"} size="20px" color="white" border="none" />
      </DateContainer>
    </>
  );
};

const DateHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
`;

const Selection = styled.select`
  border: none;
`;

const ClickDate = styled.div<ClickableDateProps>`
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "black" : "transparent")};
  padding: 5px;
  border-radius: 20px;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export default DateTime;
