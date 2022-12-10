import React, {Fragment} from 'react';
import styled from 'styled-components';
import {Spin} from 'antd';

interface IProps {
    loading?: boolean,
    isFull?: boolean
}

export const Loading: React.FC<IProps> = ({loading, isFull}) => {
    return (
        loading ?
            <LoadingContainer>
                <Spin size="large"/>
            </LoadingContainer>
            :
            <Fragment></Fragment>

    )
}

const LoadingContainer = styled.div`
    // height: ${(isFull) => isFull ? '100%' : 'calc(100% - 90px);'} 
    // width: ${(isFull) => isFull ? '100%' : 'calc(100% - 130px);'}
  width: 100%;
  height: 100%;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 99999;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  //background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`
