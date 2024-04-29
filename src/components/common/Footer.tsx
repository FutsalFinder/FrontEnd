import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterStyle>
        <Text>이용약관 | 개인정보 처리방침 | 제3자 정보제공 안내</Text>
        <Text>문의는 마음만 받겠습니다. </Text>
      </FooterStyle>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const FooterStyle = styled.footer`
  background-color: black;
  width: 100%;
  padding: 10px;
`;

const Text = styled.p`
  font-size: 12px;
  color: white;
`;

export default Footer;
