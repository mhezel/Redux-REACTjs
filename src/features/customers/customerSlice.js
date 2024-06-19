import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: '',
    natID: '',
    created_at: '',
};

const customerSlice = createSlice({
    name: 'customer',
    initialState: initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, natID){
                return {
                    payload: {fullName, natID, created_at: new Date().toISOString()}
                };
            },  
            reducer(state, action){
            state.fullName = action.payload.fullName;
            state.natID = action.payload.natID;
            state.created_at = action.payload.created_at;
            },
        },
        updateName(state, action){
            state.fullName = action.payload;
        }
    }
});

export const {createCustomer, updateName} = customerSlice.actions;
export default customerSlice.reducer;