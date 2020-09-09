import ExitIcon from "assets/icon/exit.svg";
import BackIcon from "assets/icon/navigation-arrow.svg";
import LogoImg from "assets/logo.svg";
import { RootState } from "core/redux";
import { signOut } from "core/stores/auth.store";
import theme, { tablet } from "core/theme";
import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { If } from "./UIIf";

/** Barra de navegación superior */
export const Topbar: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const literals = useSelector((state: RootState) => state.literals.topbar);

  const currentPath = history.location.pathname;
  const login = currentPath === "/login";
  const parent = history.location.pathname?.substring(
    0,
    currentPath?.lastIndexOf("/")
  );

  const handleGoBack = () => {
    if (parent) {
      history.push("/users");
    }
  };

  return (
    <If condition={!login}>
      <Header>
        <Container>
          <Action
            onClick={handleGoBack}
            disabled={!parent}
            style={{ opacity: parent ? "1" : "0" }}
            aria-label={literals?.goBack}
          >
            <img src={BackIcon} alt="icon" role="presentation" />
            <ActionTxt>{literals?.goBack}</ActionTxt>
          </Action>
          <Logo
            src={LogoImg}
            alt="logo"
            style={{ left: parent ? "calc(50% - 48px)" : "1rem" }}
          />
          <Action
            onClick={() => dispatch(signOut())}
            aria-label={literals?.goBack}
          >
            <img src={ExitIcon} alt="icon" role="presentation" />
            <ActionTxt>{literals?.signOut}</ActionTxt>
          </Action>
        </Container>
      </Header>
    </If>
  );
};

const Logo = styled.img`
  position: absolute;
  top: calc(50% - 16px);
  transition: left 0.4s ${theme.easing.inOutExpo};
  ${tablet} {
    transition: none;
    left: calc(50% - 48px) !important;
  }
`;

const Header = styled.header`
  height: 3rem;
  background: ${theme.color.darker};
  ${tablet} {
    height: 3.5rem;
  }
`;

const Action = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5625rem 0;
  outline: none;
  transition: opacity 0.3s linear;
  ${tablet} {
    transition-duration: 0.1s;
  }
`;

const ActionTxt = styled.span`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  ${tablet} {
    position: relative;
    width: auto;
    height: auto;
    overflow: initial;
    bottom: 1px;
    margin-left: 0.5rem;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  width: 100%;
  max-width: ${theme.wrapper.main};
  padding: 0 ${theme.padding.mobile};
`;
