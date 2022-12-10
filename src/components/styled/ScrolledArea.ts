import styled from "styled-components";
import {DefaultTheme} from "styled-components";

interface ScrolledAreaProps {
    theme: DefaultTheme;
}

export const ScrolledArea = styled.div<ScrolledAreaProps>`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: baseline;
  padding: 10px 20px 30px 35px
  /* justify-content: center; */
`;

