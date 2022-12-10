import React, {useEffect, useState, useRef, memo, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate, Link} from "react-router-dom";
import plusIcon from "../assets/icons/plus-circle.svg";
import {RootState} from "../store";
import {OrderData} from "../store/order";
import {Card, Loading} from "../components";
import {Button} from "../components/styled";
import {Space, Table, Tag} from 'antd';
import styled from "styled-components";

export const Orders = memo(() => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const didMountRef = useRef()

    const [reload, setReload] = useState<boolean>(false)
    const [orders, setOrders] = useState([])

    let orderData = useSelector((state: RootState) => state.orderData.orderData)
    const errorOrder = useSelector((state: RootState) => state.orderData.error)
    //loading
    const allLoading = useSelector((state: RootState) => state.loadings);

    interface DataType {
        no: number;
        table: string;
        servant: number;
        status: string;
        totalAmount: number;
        endTime: string;
    }

    useEffect(() => {
        if (errorOrder) {
            // @ts-ignore
            toast.error(errorOrder, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    }, [errorOrder])

    useEffect(() => {
        // @ts-ignore
        dispatch(OrderData())
        navigate("/");

        if (!navigator.onLine) {
            toast.error('No Internet Connection', {
                position: "top-right",
                autoClose: 5000,
            });
        }
    }, [reload])

    const totalAmounts = orderData?.reduce((acc: number, item) => {
        if (item.status === 'completed') {
            return acc + item.totalAmount;
        }
        return acc;
    }, 0);

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no'
        },
        {
            title: 'Table',
            dataIndex: 'table',
            key: 'table'
        },
        {
            title: 'Servant',
            dataIndex: 'servant',
            key: 'servant'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = status === 'completed' ? 'green' : status === 'uncompleted' ? 'geekblue' : 'volcano';
                return (
                    <span>
                    <Tag color={color}>
                         {status.toUpperCase()}
                    </Tag>
              </span>
                )
            }
        },
        {
            title: 'Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount'
        },
        {
            title: 'End time',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ]

    useEffect(() => {
        //ref vasitəsi ilə ilk renderin qarşısını alırıq
        if (didMountRef.current) {
            const ordersData = orderData?.map((order, idx) => {
                const {
                    id,
                    table,
                    servant,
                    status,
                    totalAmount,
                    endTime
                } = order;
                return ({
                    key: id,
                    no: id,
                    table: table,
                    servant: servant,
                    status: status,
                    totalAmount: totalAmount,
                    endTime: endTime,
                    action: <Space size="middle">
                        <StyledButton to={`/order/${id}`}>View</StyledButton>
                    </Space>
                })
            })
            Promise.all(ordersData).then(function (results) {
                results.sort((a, b) => a.status.localeCompare(b.status));
                // @ts-ignore
                return setOrders(results);
            })
        } else {
            // @ts-ignore
            didMountRef.current = true;
        }
    }, [orderData])

    return (
        <React.Fragment>
            <Loading loading={
                allLoading?.isLoading
            }/>
            <Card
                totalOrders={orderData?.length}
                // @ts-ignore
                totalAmounts={totalAmounts}
            />
            <StyledTableHeader><Link to='order/new'><img src={plusIcon} alt="plus icon"/> <span>Create new order</span></Link></StyledTableHeader>
            <Table columns={columns} dataSource={orders}/>
            {!localStorage.getItem('AllData') && <Button onClick={() => setReload(!reload)}>Tap to reload</Button>}
            <ToastContainer/>
        </React.Fragment>
    )
})

export const StyledButton = styled(Link)`
  border: none;
  padding: 10px 25px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  border-radius: 6px;
  color: #fff;
  background-color: #1677ff;
  box-shadow: 0 2px 0 rgb(5 145 255 / 10%);
  transition: all linear .35s;

  &:hover {
    opacity: .7;
  }
`

export const StyledTableHeader = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  span {
    margin-bottom: 2px;
  }

  a {
    border: none;
    padding: 15px 10px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    border-radius: 6px;
    color: #fff;
    background-color: green;
    box-shadow: 0 2px 0 rgb(5 145 255 / 10%);
    transition: all linear .35s;
    text-decoration: none;
    display: flex;
    align-items: center;
    column-gap: 7px;

    &:hover {
      opacity: .7;
    }
  }
`
