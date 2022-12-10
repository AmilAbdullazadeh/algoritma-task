import React from 'react';
import styled from "styled-components";
import {DefaultTheme} from "styled-components";

interface FormItemProps {
    theme: DefaultTheme
}

interface IProps {
    name: string | number,
    value: string | number
}

export const OrderItem: React.FC<IProps> = ({name, value}) => {
    return (
        <StyledContainer>
            <label>{name}</label>
            <span>{value}</span>
        </StyledContainer>
    )
}

export const StyledContainer = styled.div<FormItemProps>`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  margin: 20px;

  label {
    font-size: 16px;
    font-weight: 500;
    margin-right: 10px;
  }

  span {
    font-size: 16px;
  }
`
