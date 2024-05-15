import React, { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import Button from "./common/Button";
import { useData } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  for (let i = 0; i < 15; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const day = date.getDate();
    const dayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "short" });
    dates.push({
      dateInfo: (
        <div>
          {`${day}`}
          <br />
          {`${dayOfWeek}`}
        </div>
      ),
      dayOfWeek: dayOfWeek,
    });
  }

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const mobileSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true, // 스와이프한 만큼 넘어가도록 설정
  };

  const desktopSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  return (
    <>
      <DateHead>
        <Text>날짜 선택</Text>
        <SelectContainer>
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
        </SelectContainer>
      </DateHead>
      {isMobile ? (
        <SliderContainer>
          <Slider {...mobileSettings}>
            {dates.map((date, index) => (
              <div key={index}>
                <ClickDate
                  onClick={() => handleDateClick(index)}
                  isSelected={index === selectedDate}
                  dayOfWeek={date.dayOfWeek}
                >
                  <Button
                    text={date.dateInfo}
                    size="14px"
                    color={index === selectedDate ? "#007bff" : "transparent"}
                    fontColor={
                      index === selectedDate
                        ? "white"
                        : dayOfWeekColor(date.dayOfWeek)
                    }
                    border="none"
                    borderRadius="20px"
                  />
                </ClickDate>
              </div>
            ))}
          </Slider>
        </SliderContainer>
      ) : (
        <DateContainer id="date-container">
          <Button
            text={"<"}
            size="20px"
            color="white"
            border="none"
            onClick={handlePrevWeek}
            disabled={selectedWeek === 0}
          />
          {dates.slice(selectedWeek, selectedWeek + 7).map((date, index) => (
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
                      : dayOfWeekColor(date.dayOfWeek)
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
      )}
    </>
  );
};

function dayOfWeekColor(dayOfWeek: string) {
  if (dayOfWeek === "토") return "blue";
  if (dayOfWeek === "일") return "red";
  return "black";
}

const DateHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: space-evenly;
  }
`;

const Text = styled.h3`
  margin-top: 0px;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    font-size: 18px;
    margin-left: -13px;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  height: 22px;
  gap: 10px;

  @media screen and (max-width: 768px) {
    gap: 4px;
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
  padding: 12px;
  border-radius: 20px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px;
    width: 16px;
  }
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const SliderContainer = styled.div`
  width: 100%;
  .slick-slide > div {
    display: flex;
    justify-content: center;
  }
`;

export default DateTime;
