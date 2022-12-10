import styled from "styled-components";
import {DefaultTheme} from "styled-components";

interface IProps {
    theme: DefaultTheme;
}

export const ValidationErrorText = styled.span<IProps>`
  color: ${props => props.theme.colors.secondary};
  font-size: 14px;
  margin-top: 10px;
`;
