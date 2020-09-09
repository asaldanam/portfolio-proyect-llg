import React from "react";
import styled from "styled-components";
import arrowImg from "assets/icon/navigation-arrow.svg";
import theme, { tablet } from "core/theme";

/** Paginado de listado */
export const Pagination: React.FC<{
  total: number;
  current: number;
  nextBtnTxt: string;
  prevBtnTxt: string;
  ofTxt: string;
  onArrowClick: (direction: "prev" | "next") => void;
}> = ({ total, current, onArrowClick, nextBtnTxt, prevBtnTxt, ofTxt }) => {
  const isFirst = current <= 1;
  const isLast = current === total;

  return (
    <Container>
      <ArrowButton
        onClick={() => onArrowClick("prev")}
        disabled={isFirst}
        aria-label={prevBtnTxt}
        style={{ opacity: isFirst ? 0 : 1 }}
      >
        <ArrowIcon src={arrowImg} alt={prevBtnTxt} role="presentation" />
      </ArrowButton>
      <Text>
        {current} {ofTxt} {total}
      </Text>
      <ArrowButton
        onClick={() => onArrowClick("next")}
        disabled={current === total}
        aria-label={nextBtnTxt}
        style={{ opacity: isLast ? 0 : 1 }}
      >
        <ArrowIconRight src={arrowImg} alt={nextBtnTxt} role="presentation" />
      </ArrowButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > *:not(:last-child) {
    margin-right: 2rem;
  }
  ${tablet} {
    justify-content: flex-end;
  }
`;

const ArrowButton = styled.button`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${theme.borderRadius.main};
  outline: none;
`;

const ArrowIcon = styled.img`
  width: 1.25rem;
`;

const ArrowIconRight = styled(ArrowIcon)`
  transform: rotate(180deg);
`;

const Text = styled.p`
  position: relative;
  bottom: 1px;
`;
