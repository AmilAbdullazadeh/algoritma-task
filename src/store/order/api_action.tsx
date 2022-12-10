import {createAsyncThunk} from '@reduxjs/toolkit';
import client from '../../client';

export const OrderData = createAsyncThunk(
    'orderData',
    async (config, thunkAPI) => {
        try {
            const data = await client('orders')
            localStorage.setItem('AllOrders', JSON.stringify(data))
            return data
        } catch (error) {
            // @ts-ignore
            return thunkAPI.rejectWithValue(error.response)
        }
    })

export const OrderDetails = createAsyncThunk(
    'orderDetails',
    async (config, thunkAPI) => {
        // @ts-ignore
        const {id} = config
        try {
            const data = await client(`orders/${id}`)
            localStorage.setItem('OrderDetails', JSON.stringify(data))
            return data
        } catch (error) {
            // @ts-ignore
            return thunkAPI.rejectWithValue(error.response)
        }
    })

export const OrderCreate = createAsyncThunk(
    'orderCreate',
    async (config, thunkAPI) => {
        // @ts-ignore
        try {
            const data = await client(`orders`, config)
            return data
        } catch (error) {
            // @ts-ignore
            return thunkAPI.rejectWithValue(error.response)
        }
    })

export const OrderUpdate = createAsyncThunk(
    'orderUpdate',
    async (config, thunkAPI) => {
        // @ts-ignore
        const {id} = config
        try {
            const data = await client(`orders/${id}`, {status: 'canceled'}, 'PUT')
            localStorage.setItem('OrderDetails', JSON.stringify(data))
            return data
        } catch (error) {
            // @ts-ignore
            return thunkAPI.rejectWithValue(error.response)
        }
    })

