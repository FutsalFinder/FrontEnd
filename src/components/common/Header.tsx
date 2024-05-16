import styled from "styled-components";
// import { FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <HeaderStyle>
      <Title onClick={() => window.location.reload()}>Futsal Finder</Title>
      {/* <SearchInputContainer>
        <FiSearchIcon />
        <SearchInput type="search" placeholder="구장을 검색하세요." />
      </SearchInputContainer> */}
    </HeaderStyle>
  );
};
const HeaderStyle = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`;

// const SearchInputContainer = styled.div`
//   position: relative;
// `;

// const SearchInput = styled.input`
//   height: 40px;
//   width: 240px;
//   padding: 10px;
//   padding-left: 40px;

//   @media screen and (max-width: 768px) {
//     width: 160px;
//   }
// `;

// const FiSearchIcon = styled(FiSearch)`
//   position: absolute;
//   top: 50%;
//   left: 10px;
//   transform: translateY(-50%);
// `;

const Title = styled.h1`
  font-family: "Arial", sans-serif;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

export default Header;
