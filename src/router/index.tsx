import React, {Suspense, lazy} from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
} from 'react-router-dom';
import {Loading} from "../components";

const Home = lazy(() =>
    import('../containers')
        .then(({Home}) => ({default: Home})),
);

const Orders = lazy(() =>
    import('../containers')
        .then(({Orders}) => ({default: Orders})),
);

const OrderInfo = lazy(() =>
    import('../containers')
        .then(({OrderInfo}) => ({default: OrderInfo})),
);

const NewOrder = lazy(() =>
    import('../containers')
        .then(({NewOrder}) => ({default: NewOrder})),
);

export const Router = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/order/:id" element={<OrderInfo/>}/>
                <Route path="/order/new" element={<NewOrder/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace/>}
                />
            </Routes>
        </Suspense>
    )
}
