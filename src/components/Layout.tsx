import React from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </>
  );
}
const LayoutStyle = styled.main`
  box-sizing: border-box;
  text-align: center;
  max-width: 100%;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`;

export default Layout;
