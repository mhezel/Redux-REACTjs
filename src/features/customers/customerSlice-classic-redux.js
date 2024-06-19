const initialStateCustomer = {
    fullName: '',
    natID: '',
    created_at: '',
};

export default function customerReducer(state = initialStateCustomer, action){
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

export function createCustomer(fullName, natID){
    return {type: 'customer/createCustomer', payload: {fullName, natID, created_at: new Date().toISOString()}}
}

export function updateName(fullName){
    return {type: 'customer/updateName', payload: {fullName}}
}