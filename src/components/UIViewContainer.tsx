import styled from "styled-components";
import theme from "core/theme";
import { ReactNode } from "react";
import React from "react";

/** Contenedor principal de vista */
export const ViewContainer: React.FC<{
  children: ReactNode;
  background?: string;
}> = ({ children, background }) => {
  return (
    <Background background={background}>
      <Container>{children}</Container>
    </Background>
  );
};

const Container = styled.main`
  margin: 0 auto;
  width: 100%;
  /* height: 100%; */
  max-width: ${theme.wrapper.main};
  padding: 0 ${theme.padding.mobile};
  padding-bottom: 1rem;
`;

const Background = styled<any>("div")`
  width: 100%;
  height: 100%;
  background: ${({ background }) => background};
  position: ${({ background }) => background && "absolute"};
`;
