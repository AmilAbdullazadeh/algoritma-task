import {configureStore} from '@reduxjs/toolkit';
import loadingsReducer from "./loadings";
import {orderDataReducer, orderDetailsReducer, orderCreateReducer, orderUpdateReducer} from './order';
import {IOrder} from "../models";

export default configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
        loadings: loadingsReducer,
        orderData: orderDataReducer,
        orderDetails: orderDetailsReducer,
        orderCreate: orderCreateReducer,
        orderUpdate: orderUpdateReducer
    }
})

export interface RootState {
    loadings: any,
    orderData: { orderData: IOrder[], error: Object | string },
    orderDetails: { orderDetails: IOrder, error: Object | string },
    orderCreate: { orderCreate: IOrder, error: Object | string },
    orderUpdate: { orderUpdate: IOrder, error: Object | string }
}
