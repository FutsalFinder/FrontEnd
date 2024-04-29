import React, { useState } from "react";
import styled from "styled-components";
import Button from "./common/Button";
import { useData } from "../context/DataContext";

interface ClickableDateProps {
  isSelected: boolean;
  dayOfWeek: string;
}

const DateTime: React.FC = () => {
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const dates: { dateInfo: React.ReactNode; dayOfWeek: string }[] = [];
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [bool, setBool] = useState<boolean>(true);

  const {
    handleDateChange,
    handleRegionChange,
    handleSexChange,
    handlePlatformChange,
    toggleHideMatches,
  } = useData();

  const handleDateClick = (index: number) => {
    setSelectedDate(index);
    const selectedDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + index + 1
    );
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    handleDateChange(formattedDate);
  };

  const handleNextWeek = () => {
    setSelectedWeek(selectedWeek + 1);
  };

  const handlePrevWeek = () => {
    if (selectedWeek > 0) {
      setSelectedWeek(selectedWeek - 1);
    }
  };

  const handleHideMatch = () => {
    toggleHideMatches();
    setBool(!bool);
  };

  for (let i = 0; i < 13; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "short" });
    dates.push({
      dateInfo: (
        <div>
          {`${month}/${day}`}
          <br />
          {`${dayOfWeek}`}
        </div>
      ),
      dayOfWeek: dayOfWeek,
    });
  }

  const visibleDates = dates.slice(selectedWeek, selectedWeek + 7);

  return (
    <>
      <DateHead>
        <h3>날짜 선택</h3>
        <div>
          <Selection onChange={(e) => handleRegionChange(e.target.value)}>
            <option value="">지역</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
          </Selection>
          <Selection onChange={(e) => handleSexChange(e.target.value)}>
            <option value="">성별</option>
            <option value="남녀모두">남녀모두</option>
            <option value="남자">남자</option>
            <option value="여자">여자</option>
          </Selection>
          <Selection onChange={(e) => handlePlatformChange(e.target.value)}>
            <option value="">플랫폼</option>
            <option value="Plab">플랩</option>
            <option value="Puzzle">퍼즐</option>
            <option value="Iam">아이엠</option>
            <option value="With">위드</option>
          </Selection>
          <Button
            text={bool === true ? "마감 가리기" : "가리기 취소"}
            size="14px"
            color="white"
            border="1px solid"
            borderRadius="8px"
            onClick={handleHideMatch}
          />
        </div>
      </DateHead>
      <DateContainer>
        <Button
          text={"<"}
          size="14px"
          color="white"
          border="none"
          onClick={handlePrevWeek}
          disabled={selectedWeek === 0}
        />
        {visibleDates.map((date, index) => (
          <div key={index}>
            <ClickDate
              onClick={() => handleDateClick(selectedWeek + index)}
              isSelected={selectedWeek + index === selectedDate}
              dayOfWeek={date.dayOfWeek}
            >
              <Button
                text={date.dateInfo}
                size="14px"
                color={
                  selectedWeek + index === selectedDate
                    ? "#007bff"
                    : "transparent"
                }
                fontColor={
                  selectedWeek + index === selectedDate
                    ? "white"
                    : date.dayOfWeek === "토"
                    ? "blue"
                    : date.dayOfWeek === "일"
                    ? "red"
                    : "black"
                }
                border="none"
                borderRadius="20px"
              />
            </ClickDate>
          </div>
        ))}
        <Button
          text={">"}
          size="14px"
          color="white"
          border="none"
          onClick={handleNextWeek}
          disabled={selectedWeek + 7 >= dates.length}
        />
      </DateContainer>
    </>
  );
};

const DateHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Selection = styled.select`
  border: 1px solid;
  border-radius: 8px;
  text-align: center;
  padding: 0.75px;
  width: 60px;
`;

const ClickDate = styled.div<ClickableDateProps>`
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected ? "#007bff" : "transparent"};
  padding: 10px;
  border-radius: 20px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;
const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export default DateTime;
