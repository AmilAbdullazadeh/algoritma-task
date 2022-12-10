import React from 'react';
import styled from "styled-components";
import {IOrder} from '../models';

interface CardProps {
    totalOrders: number,
    totalAmounts: number
}

export const Card: React.FC<CardProps> = ({totalOrders, totalAmounts}) => {
    return (
        <StyledBox>
            <div className='card'>
                <div className='card--body'>
                    <div className='card--title'>
                        Total Orders
                    </div>
                    <div className='card--info'>
                        {totalOrders}
                    </div>
                </div>
            </div>
            <div className='card'>
                <div className='card--body'>
                    <div className='card--title'>
                        Total Amount
                    </div>
                    <div className='card--info'>
                        {totalAmounts} AZN
                    </div>
                </div>
            </div>
        </StyledBox>
    )
}

export const StyledBox = styled.div`
  display: flex;
  column-gap: 25px;
  padding: 30px;
  background-color: #ececec;
  border-radius: 8px;
  margin-top: 2em;

  .card {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, .88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    position: relative;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #f0f0f0;

    &--body {
      padding: 24px;
      border-radius: 0 0 8px 8px;
    }

    &--title {
      margin-bottom: 4px;
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
    }

    &--info {
      font-size: 24px;
      color: rgb(63, 134, 0);
    }
  }
`

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`
