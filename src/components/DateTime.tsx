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

  const {
    handleDateChange,
    handleRegionChange,
    handleSexChange,
    handlePlatformChange,
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
            <option value="">지역 보기</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
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
        <Button
          text={"<"}
          size="20px"
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
          size="20px"
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
`;

const Selection = styled.select`
  border: none;
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
`;
const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export default DateTime;
