import { ACSSStaggerFadeIn } from "animations/animations";
import { Button } from "components/UIButton";
import {
  AnimatedFormGroup,
  Hint,
  Input,
  Label,
} from "components/UIFormElements";
import { AnimatedLogo } from "components/UILogo";
import { ViewContainer } from "components/UIViewContainer";
import { RootState } from "core/redux";
import { signIn } from "core/stores/auth.store";
import theme, { tablet } from "core/theme";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ViewSignIn: React.FC = () => {
  const dispatch = useDispatch();
  const literals = useSelector((state: RootState) => state.literals.VSignIn);
  const errorMessages = useSelector(
    (state: RootState) => state.literals.errorMessages
  );
  const auth = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    dispatch(signIn(data));
  };

  return (
    <ViewContainer
      background={`linear-gradient(180deg, ${theme.color.darker} 0%, ${theme.color.medium} 100%)`}
    >
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <LogoContainer>
          <AnimatedLogo />
        </LogoContainer>
        <AnimatedFormGroup delay="1500ms">
          <Label htmlFor="email" hidden>
            {literals.emailLabel}
          </Label>
          <Input
            name="email"
            type="text"
            placeholder={literals.emailLabel}
            ref={register({
              required: errorMessages?.required,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: errorMessages?.email,
              },
            })}
          />
          <Hint error={errors?.email?.message} />
        </AnimatedFormGroup>
        <AnimatedFormGroup delay="1600ms">
          <Label htmlFor="password" hidden>
            {literals.passwordLabel}
          </Label>
          <Input
            name="password"
            type="password"
            placeholder={literals.passwordLabel}
            ref={register({
              required: errorMessages?.required,
            })}
          />
          <Hint error={errors?.password?.message} />
        </AnimatedFormGroup>
        <AnimatedFooter delay="1700ms">
          <Hint
            center
            error={
              auth?.error?.status &&
              (auth?.error?.status === 400
                ? literals?.errorAuth
                : literals?.errorServer)
            }
          />
          <Button
            type="submit"
            loading={auth.loading}
            disabled={auth.loading}
            minwidth
          >
            {literals?.submitButtonTxt}
          </Button>
        </AnimatedFooter>
      </Form>
      {/* <Decoration src={decorationImg} alt="decoration" role="presentation" /> */}
    </ViewContainer>
  );
};

export default ViewSignIn;

const LogoContainer = styled.div`
  width: 14rem;
  display: block;
  margin: 0 auto 3rem auto;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column;
  place-items: center center;
  margin: 0 auto;
  max-width: 24rem;
  width: 100%;
  padding: 3rem 1rem 0 1rem;
  padding-top: 15vh;
  @media only screen and (max-height: 560px) {
    padding-top: 10vh;
  }
  ${tablet} {
    padding-top: 20vh;
    /* margin-top: 20vh; */
  }
`;

const AnimatedFooter = styled<any>("footer")`
  ${ACSSStaggerFadeIn}
  display: flex;
  flex-flow: column;
  align-items: center;
  animation-delay: ${({ delay }) => delay};
`;
