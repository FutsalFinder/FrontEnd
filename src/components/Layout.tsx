import React from "react";
import Header from "./Header";
import Footer from "./Footer";
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
  width: 100%;
`;

export default Layout;
