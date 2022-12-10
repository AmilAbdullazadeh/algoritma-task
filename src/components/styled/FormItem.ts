import styled from "styled-components";
import {DefaultTheme} from "styled-components";

interface FormItemProps {
    theme: DefaultTheme;
}

export const FormItem = styled.div<FormItemProps>`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  margin: 20px 20px 20px 0;
  width: 300px;

  label {
    font-size: 14px;
    margin-bottom: 12px;
  }
`;

