import styled from "styled-components";
import {DefaultTheme} from "styled-components";

interface SelectProps {
    theme: DefaultTheme;
}

export const Select = styled.select<SelectProps>`
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  width: 100%;
  border: solid 1px ${props => props.theme.colors.lightGray};
  outline: none;
  position: relative;
`;

