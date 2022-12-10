import styled from "styled-components";
import {DefaultTheme} from "styled-components";

interface FormProps {
    theme: DefaultTheme;
}

export const Form = styled.div<FormProps>`
  padding-top: 10px;
  margin-top: 10px;
  border-radius: 5px;
  width: 800px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: none;
  outline: none;
`;
