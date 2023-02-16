import { Breadcrumb } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { v4 } from 'uuid';
import { Loading } from "../components";
import {
    Button,
    CardWrapper,
    Form,
    FormItem,
    Input,
    Select,
    ValidationErrorText
} from '../components/styled';
import { RootState } from '../store';
import { OrderCreate } from '../store/order';
import { formatDate, validations } from '../utils';


interface IProps {
}

export const NewOrder: React.FC<IProps> = () => {

    const [value, setValue] = useState<any>({
        table: '',
        servant: '',
        productName: '',
        count: '',
        totalAmount: 1,
    })

    const [errors, setErrors] = useState<any>({})
    const [isCreateOrder, setIsCreateOrder] = useState<boolean>(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let orderData = useSelector((state: RootState) => state.orderData.orderData)
    //loading
    const allLoading = useSelector((state: RootState) => state.loadings);

    const getAmountFromProduct = useCallback((productName: string) => {
        let productObj = {
            'Çörəkdə ət dönər': 7,
            'Toyuq kotlet': 3,
            'Lavaşda toyuq dönər': 5.5,
            'default': 0
        };
        // @ts-ignore
        let productAmount: number = productObj[productName] || productObj['default'];
        return productAmount;
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    }

    const createOrder = () => {
        if (value.table && value.servant) {
            setIsCreateOrder(true)
        }
    }

    const handleFormSubmit = () => {
        if (!navigator.onLine) {
            toast.error('No Internet Connection', {
                position: "top-right",
                autoClose: 5000,
            });
        } else {
            // get itemIds from data array
            let itemIds = orderData.map(item => item.id);
            // create new id (basically +1 of last item object)
            let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

            setErrors(validations(value))

            if (Object.keys(validations(value)).length < 1) {
                // @ts-ignore
                dispatch(OrderCreate({
                    id: newId,
                    table: value.table,
                    servant: value.servant,
                    status: 'uncompleted',
                    orders: [
                        {
                            id: v4(),
                            title: {
                                productName: value.productName,
                                amount: getAmountFromProduct(value.productName)
                            },
                            count: Number(value.count),
                            amount: getAmountFromProduct(value.productName) * value.count,
                            orderTime: formatDate(new Date()),
                            status: 'uncompleted'
                        }
                    ],
                    totalAmount: getAmountFromProduct(value.productName) * value.count,
                    endTime: formatDate(new Date())
                }))
                navigate('/')
            }
        }
    }

    return (
        <React.Fragment>
            <Loading loading={
                allLoading?.isLoading
            }/>
            <CardWrapper>
                <Header className="header" style={{marginBottom: "20px"}}>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>New order</Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <h2>Create new order</h2>
                <Form>
                    <FormItem>
                        <label>Table</label>
                        <Select disabled={isCreateOrder} name='table' value={value.table || ''}
                                onChange={(event) => handleChange(event)}>
                            <option disabled></option>
                            <option value='table-1'>table-1</option>
                            <option value='table-3'>table-3</option>
                            <option value='table-5'>table-5</option>
                        </Select>
                        {errors.currency && <ValidationErrorText>asdfasd{errors.currency}</ValidationErrorText>}
                    </FormItem>
                    <FormItem>
                        <label>Servant</label>
                        <Select disabled={isCreateOrder} name='servant' value={value.servant || ''}
                                onChange={(event) => handleChange(event)}>
                            <option disabled></option>
                            <option value='Murtuz'>Murtuz</option>
                            <option value='Abulfaz'>Abulfaz</option>
                        </Select>
                        {errors.currency && <ValidationErrorText>{errors.currency}</ValidationErrorText>}
                    </FormItem>
                    {/*@ts-ignore*/}
                    <Button style={{display: isCreateOrder && 'none'}} onClick={createOrder}>Click order</Button>
                    {
                        isCreateOrder && (
                            <>
                                <FormItem>
                                    <label>Product name</label>
                                    <Select name='productName' value={value.productName || ''}
                                            onChange={(event) => handleChange(event)}>
                                        <option disabled></option>
                                        <option value='Çörəkdə ət dönər'>Çörəkdə ət dönər</option>
                                        <option value='Toyuq kotlet'>Toyuq kotlet</option>
                                        <option value='Lavaşda toyuq dönər'>Lavaşda toyuq dönər</option>
                                    </Select>
                                    {errors.currency && <ValidationErrorText>{errors.currency}</ValidationErrorText>}
                                </FormItem>
                                <FormItem>
                                    <label>Count</label>
                                    <Input name="count" type='number' value={value.count || ''}
                                           onChange={(event) => handleChange(event)}/>
                                    {errors.count && <ValidationErrorText>{errors.count}</ValidationErrorText>}
                                </FormItem>
                                <Button onClick={handleFormSubmit}>Click order</Button>
                            </>
                        )
                    }
                </Form>
            </CardWrapper>
            <ToastContainer/>
        </React.Fragment>

    );
}

