import {createSlice} from '@reduxjs/toolkit';
import {OrderData, OrderDetails, OrderCreate, OrderUpdate} from './api_action';
import {IOrder} from "../../models";

interface OrderState {
    orderData: IOrder[],
    error: Object | null | undefined
}

const initialStateOrderData = {
    orderData: [],
    error: null
} as OrderState

const cache: any = localStorage.getItem('AllOrders')

const OrderDataSlice = createSlice({
    name: 'orderData',
    initialState: initialStateOrderData,
    reducers: {},
    extraReducers: {
        [OrderData.fulfilled.type]: (state, action) => {
            state.orderData = navigator.onLine ? action.payload : JSON.parse(cache)
        },
        [OrderData.rejected.type]: (state, action) => {
            state.error = action.error.message
            state.orderData = JSON.parse(cache)
        }
    }
})

export {OrderData}
export const orderDataReducer = OrderDataSlice.reducer

// start order details

interface OrderDetailsState {
    orderDetails: {},
    error: Object | null | undefined
}

const initialStateOrderDetails = {
    orderDetails: {},
    error: null
} as OrderDetailsState

const cacheDetails: any = localStorage.getItem('OrderDetails')

const OrderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: initialStateOrderDetails,
    reducers: {},
    extraReducers: {
        [OrderDetails.fulfilled.type]: (state, action) => {
            state.orderDetails = navigator.onLine ? action.payload : JSON.parse(cache)
        },
        [OrderDetails.rejected.type]: (state, action) => {
            state.error = action.error.message
            state.orderDetails = JSON.parse(cache)
        }
    }
})

export {OrderDetails}
export const orderDetailsReducer = OrderDetailsSlice.reducer

// start order create

interface OrderCreateState {
    newOrder: {},
    error: Object | null | undefined
}

const initialStateOrderCreate = {
    newOrder: {},
    error: null
} as OrderCreateState

const OrderCreateSlice = createSlice({
    name: 'orderCreate',
    initialState: initialStateOrderCreate,
    reducers: {},
    extraReducers: {
        [OrderCreate.fulfilled.type]: (state, action) => {
            state.newOrder = action.payload
        },
        [OrderCreate.rejected.type]: (state, action) => {
            state.error = action.error.message
        }
    }
})

export {OrderCreate}
export const orderCreateReducer = OrderCreateSlice.reducer

// start order update

interface OrderUpdateState {
    orderUpdate: {},
    error: Object | null | undefined
}

const initialStateOrderUpdate = {
    orderUpdate: {},
    error: null
} as OrderUpdateState

const OrderUpdateSlice = createSlice({
    name: 'orderUpdate',
    initialState: initialStateOrderUpdate,
    reducers: {},
    extraReducers: {
        [OrderUpdate.fulfilled.type]: (state, action) => {
            state.orderUpdate = action.payload
        },
        [OrderUpdate.rejected.type]: (state, action) => {
            state.error = action.error.message
        }
    }
})

export {OrderUpdate}
export const orderUpdateReducer = OrderUpdateSlice.reducer
