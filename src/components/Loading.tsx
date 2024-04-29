import Spinner from "../assets/spinner.gif";
import styled from "styled-components";

const Loaindg = () => {
  return (
    <div>
      <Wrapper>
        <Text>Loading...</Text>
        <img src={Spinner} alt="로딩" width="5%" />
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;

export default Loaindg;
