import { Error } from "components/UIError";
import { If } from "components/UIIf";
import { Pagination } from "components/UIPagination";
import { Title } from "components/UITitle";
import { User, UserSkeleton } from "components/UIUser";
import { ViewContainer } from "components/UIViewContainer";
import { RootState } from "core/redux";
import { clearUser } from "core/stores/user-details.store";
import { getUsers } from "core/stores/users.store";
import theme, { desktop, tablet } from "core/theme";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const VList: React.FC = () => {
  const dispatch = useDispatch();

  const { data: users, total_pages, page, error } = useSelector(
    (state: RootState) => state.users
  );
  const literals = useSelector((state: RootState) => state.literals.VList);

  const hasUsers = users && users.length > 0;
  const usersEmpty = users && users.length === 0;
  const skeleton = Array.from({ length: 6 }).fill({});

  const changePage = useCallback(
    (direction: "prev" | "next") => {
      if (direction === "prev") {
        dispatch(getUsers(page - 1));
      } else if (direction === "next") {
        dispatch(getUsers(page + 1));
      }
    },
    [dispatch, page]
  );

  useEffect(() => {
    if (usersEmpty) {
      dispatch(getUsers(page));
    }
    dispatch(clearUser());
  }, [dispatch, page, users, usersEmpty]);

  return (
    <ViewContainer>
      <Title>{literals?.title}</Title>
      <If condition={!!users}>
        <List>
          {hasUsers &&
            users?.map((user, index) => (
              <Item key={user?.id || index}>
                <User
                  index={index}
                  id={user?.id}
                  name={user?.first_name}
                  surname={user?.last_name}
                  avatar={user?.avatar}
                  email={user?.email}
                  to={`/users/${user?.id}`}
                />
              </Item>
            ))}
          {usersEmpty &&
            skeleton.map((_, index) => (
              <Item key={index}>
                <UserSkeleton />
              </Item>
            ))}
        </List>
        <Pagination
          total={total_pages}
          current={page}
          onArrowClick={changePage}
          ofTxt={literals.ofTxt}
          nextBtnTxt={literals.nextBtnTxt}
          prevBtnTxt={literals.prevBtnTxt}
        />
      </If>
      <If condition={error?.status === 404}>
        <Error>{literals?.errorNotFound}</Error>
      </If>
      <If condition={error && error?.status !== 404}>
        <Error>{literals?.errorCritical}</Error>
      </If>
    </ViewContainer>
  );
};

export default VList;

const List = styled.ul`
  margin: 0 -1rem;
  ${tablet} {
    display: flex;
    margin: 0 -0.5rem;
    flex-flow: row wrap;
  }
`;

const Item = styled.li`
  width: 100%;
  padding: 0.5rem 1rem;
  :nth-child(odd) {
    background: ${theme.color.light}11;
    ${tablet} {
      background: unset;
    }
  }
  ${tablet} {
    background: unset;
    /* margin-bottom: 0.5rem; */
    padding: 0.5rem;
    width: 50%;
  }
  ${desktop} {
    width: 33.3334%;
  }
`;
