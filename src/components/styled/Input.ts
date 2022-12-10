import styled from "styled-components";
import {DefaultTheme} from "styled-components";

interface InputProps {
    theme: DefaultTheme;
    type: string
}

export const Input = styled.input<InputProps>`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  max-width: ${props => props.type === 'number' ? '35px' : '100%'};
  border: solid 1px ${props => props.theme.colors.lightGray};
  outline: none;
  text-align: ${props => props.type === 'number' ? 'center' : 'left'};;
  background-color: transparent;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

