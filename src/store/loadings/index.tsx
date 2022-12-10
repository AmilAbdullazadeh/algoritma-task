const loadingsReducer = (state = {}, action: any) => {
    const matches = /(.*)\/(pending|fulfilled|rejected)$/.exec(action.type);
    // if action types are not an api actions ( ***/pending|fulfilled|rejected ), so we ignore them
    if (!matches) return state;

    const [, requestName, requestState] = matches;

    return {
        ...state,
        // will be true when receiving fetchOrders/pending
        // and false when receiving fetchOrders/fulfilled or fetchAllOrders/rejected
        isLoading: requestState === "pending", // shared loading for most use cases
        [requestName]: requestState === "pending"
    };
};

export default loadingsReducer;

// [fetchOrderById.pending]: (state, action) => {
//   if (state.loading === 'idle') {
//     state.loading = 'pending'
//     state.currentRequestId = action.meta.requestId
//   }
// },
// [fetchOrderById.fulfilled]: (state, action) => {
//   const { requestId } = action.meta
//   if (state.loading === 'pending' && state.currentRequestId === requestId) {
//     state.loading = 'idle'
//     state.entities.push(action.payload)
//     state.currentRequestId = undefined
//   }
// },
// [fetchOrderById.rejected]: (state, action) => {
//   const { requestId } = action.meta
//   if (state.loading === 'pending' && state.currentRequestId === requestId) {
//     state.loading = 'idle'
//     state.error = action.error
//     state.currentRequestId = undefined
//   }
// }
