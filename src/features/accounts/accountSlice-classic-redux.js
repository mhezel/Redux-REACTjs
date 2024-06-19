const initialStateAccount = {
    balance: 0,
    loanAmount: 0,
    loanPurpose: '',
    isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action){
    switch(action.type){
            case 'account/deposit':
                return {
                    ...state, balance: state.balance + action.payload, isLoading: false
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

            case 'account/convertingCurrency':
            return {
                ...state, isLoading: true
            }

        default: 
            return state;
    }
}

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
  
export function withdraw(amount){
      return {type: 'account/withdraw', payload: amount}
  }
  
export function requestLoan(amount, purpose){
      return {type: 'account/requestLoan', payload: {amount, purpose}}
  }
  
export function payLoan(){
      return {type: 'account/payLoan'}
  }