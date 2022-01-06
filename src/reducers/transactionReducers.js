const { 
    TRANSACTION_LIST_FAIL,
    TRANSACTION_LIST_REQUEST, 
    TRANSACTION_LIST_SUCCESS ,
    TRANSACTION_DETAILS_REQUEST,
    TRANSACTION_DETAILS_SUCCESS,
    TRANSACTION_DETAILS_FAIL} =require("../constants/transactionConstants");

export const transactionListReducer =(state = {
    loading: true,
    transactions: []}, 
    action
    ) =>{
    switch(action.type){
        case TRANSACTION_LIST_REQUEST:
            return {loading: true};
        case TRANSACTION_LIST_SUCCESS:
            return {loading: false, transactions: action.payload};
        case TRANSACTION_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
    
};

export const transactionDetailsReducer =(state = {
    loading: true,
    transactions: []}, 
    action
    ) =>{
        switch(action.type){
            case TRANSACTION_DETAILS_REQUEST:
                return {loading: true};
            case TRANSACTION_DETAILS_SUCCESS:
                return {loading: false, transactions: action.payload};
            case TRANSACTION_DETAILS_FAIL:
                return {loading: false, error: action.payload};
            default:
                return state;
        }
        
    };