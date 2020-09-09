import { keyframes, css } from "styled-components";
import theme from "core/theme";

export const AFadeInOpacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ARotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-359deg);
  }
`;

export const AFadeInFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AUpdateTextColor = keyframes`
  from {
    color: #a7ff00;
  }
  to {
    color: ${theme.color.light};
  }
`;

export const ACSSStaggerFadeIn = css`
  opacity: 0;
  transform: translateY(20px);
  animation: ${AFadeInFromBottom} 500ms ${theme.easing.inOutExpo} forwards;
`;
