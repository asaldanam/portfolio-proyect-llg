import styled from "styled-components";
import theme from "core/theme";

/** Caja de avatar para imágenes de usuario */
export const Avatar = styled<any>("div")`
  width: ${({ size }) => size || "4rem"};
  height: ${({ size }) => size || "4rem"};
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-color: ${theme.color.medium};
`;
