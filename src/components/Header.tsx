import React from "react";

import styled from "styled-components";

const Header = () => {
  return (
    <HeaderStyle>
      <Title>Futsal Finder</Title>
      <SearchInput type="search" placeholder="구장을 검색하세요." />
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  width: 100%;
  padding: 0px 1s0px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`;

const SearchInput = styled.input`
  height: 40px;
  width: 240px;
  padding: 10px;
`;

const Title = styled.h1``;

export default Header;
