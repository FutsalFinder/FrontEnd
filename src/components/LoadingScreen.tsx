import React from "react";
import styled from "styled-components";

const LoaindgScreen = () => {
  return (
    <div>
      <Wrapper>
        <Text>Loading...</Text>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.span`
  font-size: 24px;
`;

export default LoaindgScreen;
