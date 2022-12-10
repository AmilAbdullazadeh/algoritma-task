import React, {useEffect, useState, useRef, memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import {Link, useParams} from "react-router-dom";
import {Breadcrumb, Divider, Table, Tag} from 'antd';
import styled from "styled-components";
import {RootState} from "../store";
import {OrderDetails, OrderUpdate} from "../store/order";
import {Loading} from "../components";
import {Button} from "../components/styled";
import {Header} from "antd/es/layout/layout";


export const OrderInfo = memo(() => {
    const dispatch = useDispatch()
    const didMountRef = useRef()

    let {id} = useParams()

    const [details, setDetails] = useState([])

    let orderDetails = useSelector((state: RootState) => state.orderDetails.orderDetails)
    let orderUpdate = useSelector((state: RootState) => state.orderUpdate.orderUpdate)
    const errorOrderDetails = useSelector((state: RootState) => state.orderDetails.error)
    //loading
    const allLoading = useSelector((state: RootState) => state.loadings);

    interface DataType {
        no: number;
        table: string;
        servant: number;
        status: string;
        orders: [];
        totalAmount: number;
        endTime: string;
    }

    useEffect(() => {
        if (errorOrderDetails) {
            // @ts-ignore
            toast.error(errorOrderDetails, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    }, [errorOrderDetails])

    useEffect(() => {
        // @ts-ignore
        dispatch(OrderDetails({id}))

        if (!navigator.onLine) {
            toast.error('No Internet Connection', {
                position: "top-right",
                autoClose: 5000,
            });
        }
    }, [orderUpdate])

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
                         {status?.toUpperCase()}
                    </Tag>
              </span>
                )
            }
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Orders',
            key: 'orders'
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
        }
    ]

    const cancelOrder = (id: number) => {
        // @ts-ignore
        dispatch(OrderUpdate({id}))
    }

    useEffect(() => {
            //ref vasitəsi ilə ilk renderin qarşısını alırıq
            if (didMountRef.current) {
                const ordersDetails = {
                    key: orderDetails.id,
                    no: orderDetails.id,
                    table: orderDetails.table,
                    servant: orderDetails.servant,
                    status: orderDetails.status,
                    orders: <span>
                        {orderDetails.orders?.map((order: any, idx: number) => {
                            const {id, title, count, orderTime, status} = order
                            let color = status === 'completed' ? 'green' : status === 'uncompleted' ? 'geekblue' : 'volcano';
                            return (
                                <StyledDescription key={id}>
                                    <span><Tag color="#f50">Order: {idx + 1}</Tag></span>
                                    <span>Product name: {title?.productName}</span>
                                    <span>Amount: {title?.amount} AZN</span>
                                    <span>Count: {count}</span>
                                    <span>Order time: {orderTime}</span>
                                    <span>Status:
                                        <Tag color={color}>
                                            {status?.toUpperCase()}
                                        </Tag>
                                    </span>
                                    <span>
                                        <StyledCancelBtn onClick={() => cancelOrder(id)}>Cancel</StyledCancelBtn>
                                    </span>
                                    <Divider orientation="left"/>
                                </StyledDescription>
                            );
                        })}
                            </span>,
                    totalAmount: orderDetails.totalAmount,
                    endTime: orderDetails.endTime,
                }
                Promise.resolve(ordersDetails).then(function (results) {
                    // @ts-ignore
                    return setDetails([results]);
                })
            } else {
                // @ts-ignore
                didMountRef.current = true;
            }
        }, [orderDetails]
    )

    // @ts-ignore
    return (
        <StyledInfoContainer>
            <Loading loading={
                allLoading?.isLoading
            }/>
            <Header className="header" style={{marginBottom: "20px"}}>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Order Info</Breadcrumb.Item>
                </Breadcrumb>
            </Header>
            <Table
                columns={columns}
                dataSource={details}
                pagination={false}
                expandable={{
                    expandedRowRender: (record: any) => <>{record?.orders}</>,
                }}/>
            <StyledTableFooter style={{marginTop: '1.5em'}}>Total
                Amount: <b>{orderDetails?.totalAmount} AZN</b></StyledTableFooter>
            <ToastContainer/>
        </StyledInfoContainer>
    )
})

const StyledCancelBtn = styled(Button)`
  width: auto;
  padding: 10px 25px;
  font-size: 14px;
  margin: 0;
  opacity: .7;

  &:hover {
    opacity: 1;
  }
`

const StyledInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px 15px;
`

const StyledDescription = styled.div`
  margin: 10px 0;

  span {
    margin-right: 20px;
  }
`

const StyledTableFooter = styled.div`
  font-size: 1.2em;
`
