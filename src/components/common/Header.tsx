import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi"; // 돋보기 아이콘을 제공하는 라이브러리

const Header = () => {
  return (
    <HeaderStyle>
      <Title>Futsal Finder</Title>
      <SearchInputContainer>
        <FiSearchIcon />
        <SearchInput type="search" placeholder="구장을 검색하세요." />
      </SearchInputContainer>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  width: 100%;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`;

const SearchInputContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  height: 40px;
  width: 240px;
  padding: 10px;
  padding-left: 40px;

  @media screen and (max-width: 768px) {
    width: 160px;
  }
`;

const FiSearchIcon = styled(FiSearch)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

const Title = styled.h1`
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

export default Header;
