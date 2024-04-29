import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;
const Text = styled.p`
  font-size: 32px;
`;

const NotFound = () => {
  return (
    <Container>
      <Text>조건에 맞는 매치가 없습니다.</Text>
    </Container>
  );
};

export default NotFound;
