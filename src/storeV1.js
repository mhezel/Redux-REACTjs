import {createStore, combineReducers} from "redux";

const initialStateAccount = {
    balance: 0,
    loanAmount: 0,
    loanPurpose: '',
};
const initialStateCustomer = {
    fullName: '',
    natID: '',
    created_at: '',
};

function accountReducer(state = initialStateAccount, action){
    switch(action.type){
            case 'account/deposit':
                return {
                    ...state, balance: state.balance + action.payload
                };

            case 'account/withdraw':
            return {
                ...state, balance: state.balance - action.payload
            };

            case 'account/requestLoan':
            if (state.loanAmount > 0) return state;
            return {
                ...state, loanAmount: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount
            };

            case 'account/payLoan':
            return {
                ...state, loanPurpose: '', loanAmount: 0, balance: state.balance - state.loanAmount
            };

        default: 
            return state;
    }
}

function deposit(amount){
  return {type: 'account/deposit', payload: amount}
}

function withdraw(amount){
    return {type: 'account/withdraw', payload: amount}
}

function requestLoan(amount, purpose){
    return {type: 'account/requestLoan', payload: {amount, purpose}}
}

function payLoan(){
    return {type: 'account/payLoan'}
}

function customerReducer(state = initialStateCustomer, action){
    switch(action.type){

        case 'customer/createCustomer':
            return {...state, 
                    fullName: action.payload.fullName,
                    natID: action.payload.natID,
                    created_at: action.payload.created_at
                };
        case 'customer/updateName':
            return {...state, 
                    fullName: action.payload.fullName,
                }
        default: 
            return state;
    }

}

function createCustomer(fullName, natID){
    return {type: 'customer/createCustomer', payload: {fullName, natID, created_at: new Date().toISOString()}}
}

function updateName(fullName){
    return {type: 'customer/updateName', payload: {fullName}}
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
});
const store = createStore(rootReducer);

store.dispatch(createCustomer('Mhezelkhan', 12341));
console.log(store.getState());
store.dispatch(updateName('Mhezelkhan Mohammad'));
console.log(store.getState());