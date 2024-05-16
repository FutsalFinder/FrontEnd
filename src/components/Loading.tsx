import { Oval } from "react-loader-spinner";
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
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Loading;
