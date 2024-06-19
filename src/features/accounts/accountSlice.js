import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loanAmount: 0,
    loanPurpose: '',
    isLoading: false,
};

const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        deposit(state, action){
            state.balance = state.balance + action.payload;
            state.isLoading = false;
        },
        
        withdraw(state, action){
            state.balance = state.balance - action.payload;
        },

        requestLoan: {
            prepare(amount, purpose){
                return {
                    payload: {amount, purpose}
                };
            },
            reducer(state, action){
                if(state.loanAmount > 0) return;
                //redux toolkit action in nature cannot receive two arguments {amount & purpose}
                state.loanAmount = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance = state.balance +  state.loanAmount;
            },
        },

        payLoan(state){
            state.balance = state.balance - state.loanAmount;
            state.loanAmount = 0;
            state.loanPurpose = '';
        },

        convertingCurrency(state){
            state.isLoading = true;

        }
    }
});

export const {withdraw, requestLoan, payLoan} = accountSlice.actions;
export default accountSlice.reducer;

export function deposit(amount, currency){
    if(currency === "USD") return {type: 'account/deposit', payload: amount};

    //MIDDLEWARE => EFFECT
    return async function(dispatch, getState) { 

        dispatch({type: 'account/convertingCurrency'});

        //API Call
        const host = 'api.frankfurter.app';
        const res = await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const converted = data.rates.USD;

        //return
        dispatch({type: 'account/deposit', payload: converted});
    };
}