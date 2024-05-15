import Spinner from "../assets/spinner.gif";
import styled from "styled-components";
import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    // 로딩 중에 스크롤 방지
    document.body.style.overflow = "hidden";
    return () => {
      // 로딩이 끝나면 스크롤 복원
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Wrapper>
      <Text>Loading...</Text>
      <img src={Spinner} alt="로딩" width="5%" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
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

const Text = styled.p`
  font-size: 1.5rem;
  color: black;
  text-align: center;
`;

export default Loading;
