import React from 'react';
import styled from "styled-components";
import {Info} from '../components';
import {Orders} from '../containers'

interface IProps {

}

export const Home: React.FC<IProps> = () => {
    return (
        <StyledContainer>
            <Info/>
            <Orders/>
        </StyledContainer>
    )
}

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`
