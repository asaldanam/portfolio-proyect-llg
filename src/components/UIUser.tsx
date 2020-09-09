import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import theme, { tablet } from "core/theme";
import { Avatar } from "./UIAvatar";
import { AFadeInOpacity } from "animations/animations";

/** Elemento del listado de usuario */
export const User: React.FC<{
  index: number;
  id?: number;
  avatar?: string;
  name?: string;
  surname?: string;
  email?: string;
  to?: string;
}> = ({ id, avatar, name, surname, email, index }) => {
  return (
    <LinkContainer
      to={`/users/${id}`}
      style={{ animationDelay: 125 + index * 50 + "ms" }}
    >
      <Container>
        <Avatar style={{ backgroundImage: `url(${avatar})` }} />
        <Data>
          <Name>{`${name} ${surname}`}</Name>
          <Email>{email}</Email>
        </Data>
      </Container>
    </LinkContainer>
  );
};

export const UserSkeleton = styled.div`
  height: 64px;
  ${tablet} {
    height: 88px;
    background: ${theme.color.medium}33;
    border-radius: ${theme.borderRadius.main};
  }
`;

const LinkContainer = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
  opacity: 0;
  animation: ${AFadeInOpacity} 0.15s linear forwards;
  ${tablet} {
    padding: 0.75rem;
    background: ${theme.color.darker}44;
    border-radius: ${theme.borderRadius.main};
    transition: background 0.05s linear;
    :hover {
      background: ${theme.color.sky}22;
    }
  }
`;

const Container = styled.div`
  display: flex;
  place-items: center start;
`;

const Data = styled.div`
  padding-left: 0.75rem;
`;

const Name = styled.p`
  margin: 0;
  font-weight: 700;
`;

const Email = styled.p`
  margin: 0;
  color: ${theme.color.light};
  font-size: 0.875rem;
`;
