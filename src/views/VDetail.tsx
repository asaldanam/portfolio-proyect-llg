import { Avatar } from "components/UIAvatar";
import { Button } from "components/UIButton";
import { FormGroup, Hint, Input, Label } from "components/UIFormElements";
import { If } from "components/UIIf";
import { Error } from "components/UIError";
import { Title } from "components/UITitle";
import { ViewContainer } from "components/UIViewContainer";
import { FormatedDate } from "components/UIFormatedDate";
import { RootState } from "core/redux";
import {
  getUserDetails,
  requestDeleteUser,
  requestUpdateUser,
} from "core/stores/user-details.store";
import theme, { tablet } from "core/theme";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { AUpdateTextColor } from "animations/animations";

const VDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const form = useForm();
  const user = useSelector((state: RootState) => state.userDetails);
  const history = useHistory();
  const literals = useSelector((state: RootState) => state.literals.VDetail);
  const errorMessages = useSelector(
    (state: RootState) => state.literals.errorMessages
  );

  const onSubmit = (data: { [key: string]: string }) => {
    dispatch(
      requestUpdateUser({
        userId: id,
        ...data,
      })
    );
  };

  useEffect(() => {
    if (user.deleted && !user.loading) {
      history.push("/users");
    }
  }, [history, user]);

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  const fullName =
    user.first_name && user.last_name && `${user.first_name} ${user.last_name}`;

  return (
    <React.Fragment>
      <ViewContainer>
        <If condition={!user.error}>
          <Header>
            <DetailsTitle center>{fullName}</DetailsTitle>
            <Avatar
              style={user.avatar && { backgroundImage: `url(${user.avatar})` }}
              size="7rem"
            />
          </Header>
          <Updated
            style={{
              opacity: user.loading === "fetching" ? 0 : 1,
              animation:
                user.updatedAt && user.loading !== "updating" ? "" : `none`,
            }}
          >
            Última actualización:{" "}
            <FormatedDate
              date={user.updatedAt}
              fallback={literals?.notUpdatedYet}
            />
          </Updated>
          <Form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <FormGroup cols="6" sidePadding="1rem">
              <Label htmlFor="first_name">{literals?.nameLabel}</Label>
              <Input
                name="first_name"
                disabled={!!user.loading}
                defaultValue={user.first_name}
                ref={form.register({ required: errorMessages.required })}
                type="text"
              />
              <Hint error={form.errors?.first_name?.message} />
            </FormGroup>
            <FormGroup cols="6" sidePadding="1rem">
              <Label htmlFor="last_name">{literals?.surnameLabel}</Label>
              <Input
                name="last_name"
                disabled={!!user.loading}
                defaultValue={user.last_name}
                ref={form.register({ required: errorMessages.required })}
                type="text"
              />
              <Hint error={form.errors?.last_name?.message} />
            </FormGroup>
            <FormGroup sidePadding="1rem">
              <Label htmlFor="email">{literals?.emailLabel}</Label>
              <Input
                name="email"
                disabled={!!user.loading}
                defaultValue={user.email}
                ref={form.register({
                  required: errorMessages.required,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: errorMessages.email,
                  },
                })}
                type="email"
              />
              <Hint error={form.errors?.email?.message} />
            </FormGroup>
            <If condition={!!user.id}>
              <Footer>
                <Button
                  type="button"
                  ghost
                  loading={user.loading === "deleteing"}
                  disabled={!!user.loading}
                  onClick={() => dispatch(requestDeleteUser(id))}
                >
                  {literals?.deleteBtn}
                </Button>
                <Button
                  type="submit"
                  loading={user.loading === "updating"}
                  disabled={!!user.loading}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {literals?.updateBtn}
                </Button>
              </Footer>
            </If>
          </Form>
        </If>
        <If condition={user.error?.status === 404}>
          <Error>{literals?.errorNotFound}</Error>
        </If>
        <If condition={user.error && user.error?.status !== 404}>
          <Error>{literals?.errorCritical}</Error>
        </If>
      </ViewContainer>
    </React.Fragment>
  );
};

const Updated = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: ${theme.color.light};
  margin: 1rem 0 3rem 0;
  animation: ${AUpdateTextColor} 1s linear forwards;
  ${tablet} {
    margin-top: 0rem;
  }
`;

const Header = styled.header`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 0 -1rem;
  padding: 0rem 0 0rem 0;
  ${tablet} {
    padding: 3rem 0 0rem 0;
    flex-flow: column-reverse;
  }
`;

const DetailsTitle = styled<any>(Title)`
  margin: 0 0 2rem 0;
  width: 100%;
  ${tablet} {
    margin: 1rem 0 0 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -1rem;
  ${tablet} {
    margin: 0 auto;
    max-width: 32rem;
  }
`;

const Footer = styled.footer`
  width: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  > *:not(:last-child) {
    margin-right: 1rem;
  }
  > * {
    width: 100%;
    ${tablet} {
      width: auto;
    }
  }

  ${tablet} {
    justify-content: flex-end;
  }
`;

export default VDetail;
